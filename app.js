const express = require("express");
require("dotenv").config();
const cors = require("cors");
const models = require("./models/index");
const routes = require("./routes/index");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  req.context = { models, me: models.users[1] };
  next();
});

app.get("/session", routes.session);
app.get("/users", routes.user);
app.get("/messages", routes.message);

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
