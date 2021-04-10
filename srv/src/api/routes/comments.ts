import express from "express";
import { fold } from "fp-ts/lib/Option";
import makeRepositoryBadge from "../../badge";
import CommentAPI from "../spec/CommentAPI";

export default function comments(commentAPI: CommentAPI): express.Router {
  const router = express.Router();

  // Get all comments for a given repo
  router.get("/:repo", (req, res) => {
    res.json({ result: req.params.repo });
  });

  // Update the comment on the repo
  router.put("/:repo/:comment", (req, res) => {
    res.json({ result: `Updated comment ${req.params.repo}/${req.params.comment}` });
  });

  // Create a new comment on a repository
  router.post("/:repo/comment", (req, res) => {
    res.json({ result: "Creating new comment on " + req.params.repo });
  });

  router.get("/:repo/badge", async (req, res) => {
    const commentCounts = await commentAPI.getCommentCount(req.params.repo);
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
