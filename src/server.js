const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const errorMiddelware = require("./middleware/error-middleware")
const { json } = require("body-parser");

const bookRouter = require("./routes/book-routes");
const userRouter = require("./routes/user-routes")
const editorialRouter = require("./routes/editorial-routes")

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(userRouter);
app.use(bookRouter);
app.use(editorialRouter);
app.use(errorMiddelware)
module.exports = app;