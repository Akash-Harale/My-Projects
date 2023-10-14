const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://akash:harale@cluster0.f8maxby.mongodb.net/url_shortener"
);

module.exports = {
  connection,
};
