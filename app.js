const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());

let users = {
  1: {
    id: "1",
    username: "Robin Wieruch",
  },
  2: {
    id: "2",
    username: "Dave Davids",
  },
};

let messages = {
  1: {
    id: "1",
    text: "Hello World",
    userId: "1",
  },
  2: {
    id: "2",
    text: "By World",
    userId: "2",
  },
};

app.get("/users", (req, res) => {
  return res.send(Object.values(users));
});

app.get("/users/:id", (req, res) => {
  return res.send(Object.values(users[req.params.id]));
});

app.get("/messages", (req, res) => {
  return res.send(Object.values(messages));
});

app.get("/messages/:id", (req, res) => {
  return res.send(Object.values(messages[req.params.id]));
});

app.post("/messages", (req, res) => {
  const id = uuidv4();
  const message = { id };
  messages[id] = message;
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
