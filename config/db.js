const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://vipin:vipin@cluster0.ijj0oie.mongodb.net/linkedin_app?retryWrites=true&w=majority"
);

module.exports = {
  connection,
};
