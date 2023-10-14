const mongoose = require("mongoose");

const urlSchema = mongoose.Schema(
  {
    srNo: Number,
    user: String,
    userID: String,
    OriginalUrl: String,
    visitedHistory: [
      {
        timestamp: { type: String },
        device: { type: String },
      },
    ],
    shortID: { type: String, required: false, unique: true },
  },
  {
    versionKey: false,
  }
);

const UrlModel = mongoose.model("url", urlSchema);

module.exports = {
  UrlModel,
};
