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
  req.me = models.users[1];
  next();
});

app.get("/session", (req, res) => {
  res.send(models.users[req.me.id]);
});

app.get("/users", (req, res) => {
  return res.send(Object.values(models.users));
});

app.get("/users/:id", (req, res) => {
  return res.send(Object.values(models.users[req.params.id]));
});

app.get("/messages", (req, res) => {
  return res.send(Object.values(models.messages));
});

app.get("/messages/:id", (req, res) => {
  return res.send(Object.values(models.messages[req.params.id]));
});

app.post("/messages", (req, res) => {
  const id = uuidv4();
  const message = { id, text: req.body.text, userId: req.me.id };
  models.messages[id] = message;
  return res.send(message);
});

app.delete("/messages/:id", (req, res) => {
  const { [req.params.id]: message, ...otherMessages } = models.messages;
  models.messages = otherMessages;
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
