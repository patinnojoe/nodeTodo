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

const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.query;

    const todo = await Todo.findById(id);

    res.render("update-todo", { title: "Update Todo", todo });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.query;

    const todo = await Todo.findById(id);
    res.render("delete-todo", { title: "Delete Todo", todo });
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
const postUpdateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;
    const newTodo = await Todo.findById(id);
    if (!newTodo) {
      return res.status(404).send("Todo not found");
    }
    newTodo.title = title;
    newTodo.desc = desc;

    await newTodo.save();

    res.redirect(`/`);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
const postDeleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      res.status(404).json({ message: "No todo found" });
    }

    await todo.deleteOne();
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
  createTodo,
  postUpdateTodo,
  postDeleteTodo,
};
