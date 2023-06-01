const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const models = require("./models/index");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  req.context = { models, me: models.users[1] };
  next();
});

app.get("/session", (req, res) => {
  res.send(req.context.models.users[req.context.me.id]);
});

app.get("/users", (req, res) => {
  return res.send(Object.values(req.context.models.users));
});

app.get("/users/:id", (req, res) => {
  return res.send(Object.values(req.context.models.users[req.params.id]));
});

app.get("/messages", (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});

app.get("/messages/:id", (req, res) => {
  return res.send(Object.values(req.context.models.messages[req.params.id]));
});

app.post("/messages", (req, res) => {
  const id = uuidv4();
  const message = { id, text: req.body.text, userId: req.context.me.id };
  req.context.models.messages[id] = message;
  return res.send(message);
});

app.delete("/messages/:id", (req, res) => {
  const { [req.params.id]: message, ...otherMessages } =
    req.context.models.messages;
  req.context.models.messages = otherMessages;
  return res.send(message);
});

// app.post("/users", (req, res) => {
//   return res.send("POST http method on a user resource.");
// });

// app.put("/users/:id", (req, res) => {
//   return res.send(`PUT http method on a user resource, ID: ${req.params.id}.`);
// });

// app.delete("/users/:id", (req, res) => {
//   return res.send(
//     `DELETE http method on a user resource, ID: ${req.params.id}.`
//   );
// });

app.listen(process.env.PORT || 3000, () =>
  console.log("App listening to port 3000")
);
