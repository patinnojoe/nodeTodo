const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017/todoDB";

module.exports = (async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("connection successful");
  } catch (error) {
    console.log(error.message);
  }
})();
