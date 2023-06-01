const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 3000, () =>
  console.log("App listening to port 3000")
);
