const express = require("express");
const app = express();
const PORT = 8000;
const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017/todoDB";

app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("secure db connection");
  })
  .catch((error) => {
    console.log(error.message);
  });

// ROUTES
app.get("/", (req, res, next) => {
  try {
    res.render("index");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/add-todo", (req, res, next) => {
  try {
    res.render("add-todo");
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

app.get("/update-todo", (req, res, next) => {
  try {
    res.render("update-todo");
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

app.get("/delete-todo", (req, res, next) => {
  try {
    res.render("delete-todo");
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
