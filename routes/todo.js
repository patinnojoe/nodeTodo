const express = require("express");
const router = express.Router();
const TodoController = require("../controllers/todoController");

// ROUTES
router.get("/", TodoController.index);

router.get("/add-todo", TodoController.addTodo);

router.get("/update-todo", TodoController.updateTodo);

router.get("/delete-todo", TodoController.deleteTodo);

router.post("/add-todo", TodoController.createTodo);
router.post("/update-todo/:id", TodoController.postUpdateTodo);
module.exports = router;
