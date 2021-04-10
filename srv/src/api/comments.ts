import express from "express";

export default function comments(): express.Router {
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

  return router;
}
