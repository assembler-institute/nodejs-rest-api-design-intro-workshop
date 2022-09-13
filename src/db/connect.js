const mongoose = require("mongoose");

function connect() {
  return mongoose.connect("mongodb://localhost:27017/mongo-pill-basics", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
}

module.exports = connect;
