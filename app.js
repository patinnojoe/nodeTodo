const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

const bodyParser = require("body-parser");
const router = require("./routes/todo");
require("./init/mongodb");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

module.exports = app;
