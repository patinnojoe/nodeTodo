const Todo = require("../models/Todo");
const moment = require("moment");

const index = async (req, res, next) => {
  const todos = await Todo.find({}).sort({ createdAt: -1 });
  res.locals.moment = moment;
  try {
    res.render("index", { title: "Home | Todo App", todos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const addTodo = (req, res, next) => {
  try {
    res.render("add-todo", { title: "Add todod" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const updateTodo = (req, res, next) => {
  try {
    res.render("update-todo", { title: "Update Todo" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const deleteTodo = (req, res, next) => {
  try {
    res.render("delete-todo", { title: "Delete Todo" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const createTodo = async (req, res, next) => {
  try {
    const { title, desc } = req.body;

    if (!title) {
      res.json({ message: "title is required" });
    }

    const newTodo = new Todo({ title, desc });
    await newTodo.save();
    // res.status(200).json({ message: "todo created successfully" });
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports = {
  index,
  addTodo,
  updateTodo,
  deleteTodo,
  createTodo
};
