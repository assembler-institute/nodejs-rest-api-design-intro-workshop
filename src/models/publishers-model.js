const mongoose = require("mongoose");

const PublishersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  authors: {
    type: [String],
    required: true,
    ref: "user",
  },
  books: {
    type: [String],
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

const PublishersModel = new mongoose.model("publishers", PublishersSchema);

module.exports = PublishersModel;
