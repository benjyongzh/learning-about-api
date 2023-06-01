const express = require("express");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

router.get("/", (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});

router.get("/:id", (req, res) => {
  return res.send(req.context.models.messages[req.params.id]);
});

router.post("/", (req, res) => {
  const id = uuidv4();
  const message = { id, text: req.body.text, userId: req.context.me.id };
  req.context.models.messages[id] = message;
  return res.send(message);
});

router.delete("/:id", (req, res) => {
  const { [req.params.id]: message, ...otherMessages } =
    req.context.models.messages;
  req.context.models.messages = otherMessages;
  return res.send(message);
});

module.exports = router;
