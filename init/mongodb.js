const mongoose = require("mongoose");

module.exports = (async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("connection successful");
  } catch (error) {
    console.log(error.message);
  }
})();
