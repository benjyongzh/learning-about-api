const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  return res.send(Object.values(req.context.models.users));
});

router.get("/:id", (req, res) => {
  return res.send(req.context.models.users[req.params.id]);
});

module.exports = router;
