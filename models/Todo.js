// schema

const mongoose = require("mongoose");
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

module.exports = Todo;
