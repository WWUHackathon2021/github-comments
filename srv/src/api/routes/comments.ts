import express, { Request } from "express";
import { fold } from "fp-ts/lib/Option";
import makeRepositoryBadge from "../../badge";
import CommentAPI from "../spec/CommentAPI";
import Profile from "../types/Profile";

export function getRepoId(req: Request) {
  return `${req.params.user}/${req.params.repo}`;
}
export function formatDate(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
export function getProfileInfo(req: Request) {
  return ((req as any).profile as any) as Profile;
}

export default function comments(commentAPI: CommentAPI): express.Router {
  const router = express.Router();

  // Get all comments for a given repo
  router.get("/:user/:repo", async (req, res) => {
    const comments = await commentAPI.getRepoComments(getRepoId(req));
    res.json({ comments });
  });

  // Update the comment on the repo
  router.put("/:user/:repo/comment", async (req, res) => {
    const body = req.body;
    // TODO security is bad here
    const resultComment = await commentAPI.modifyComment(body.id, {
      content: body.content,
      parent: body.parent,
    });
    res.json(resultComment);
  });

  // Create a new comment on a repository
  router.post("/:user/:repo/comment", async (req, res) => {
    const repo = getRepoId(req);
    const profile = getProfileInfo(req);
    const body = req.body;
    const resultComment = await commentAPI.createComment({
      repoID: repo,
      content: body.content,
      upvoteCount: 0,
      created: formatDate(new Date()),
      fullname: profile.username,
      profilePictureURL:
        profile.avatarURL ??
        "https://mpng.subpng.com/20180326/gxq/kisspng-github-computer-icons-icon-design-github-5ab8a31e334e73.4114704215220498222102.jpg",
      parent: body.parent,
    });
    res.json(resultComment);
  });

  router.get("/:user/:repo/badge", async (req, res) => {
    const commentCounts = await commentAPI.getCommentCount(`${req.params.user}/${req.params.repo}`);
    fold(
      () => {
        res.sendStatus(500);
      },
      (result) => {
        res.contentType("svg");
        res.send(result);
      }
    )(makeRepositoryBadge(commentCounts));
  });

  return router;
}
