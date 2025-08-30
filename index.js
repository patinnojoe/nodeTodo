require("./init/mongodb");

const express = require("express");
const app = express();
const PORT = 8000;

const bodyParser = require("body-parser");
const router = require("./routes/todo");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
