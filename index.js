const express = require("express");
const app = express();
const PORT = 8000;
const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017/todoDB";
const bodyParser = require("body-parser");
const moment = require("moment");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("secure db connection");
  })
  .catch((error) => {
    console.log(error.message);
  });
// schema
const todoSchema = mongoose.Schema(
  {
    title: {
      minLength: 3,
      type: String,
      trim: true,
      require: true,
    },
    desc: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);
const Todo = mongoose.model("todo", todoSchema);

// ROUTES
app.get("/", async (req, res, next) => {
  const todos = await Todo.find({}).sort({ createdAt: -1 });
  res.locals.moment = moment;
  try {
    res.render("index", { title: "Home | Todo App", todos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/add-todo", (req, res, next) => {
  try {
    res.render("add-todo", { title: "Add todod" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

app.get("/update-todo", (req, res, next) => {
  try {
    res.render("update-todo", { title: "Update Todo" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

app.get("/delete-todo", (req, res, next) => {
  try {
    res.render("delete-todo", { title: "Delete Todo" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

app.post("/add-todo", async (req, res, next) => {
  try {
    const { title, desc } = req.body;

    if (!title) {
      res.json({ message: "title is required" });
    }

    console.log(req.body, "retttuuurrnn");
    const newTodo = new Todo({ title, desc });
    await newTodo.save();
    // res.status(200).json({ message: "todo created successfully" });
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
