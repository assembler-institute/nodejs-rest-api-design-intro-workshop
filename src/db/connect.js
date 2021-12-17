const mongoose = require("mongoose");
// const config=require()
function connect() {
    return mongoose.connect("mongodb://localhost:27017/myApp", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });
}

module.exports = connect;