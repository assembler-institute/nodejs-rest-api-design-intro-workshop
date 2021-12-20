const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { json } = require("body-parser");
const UserRouter = require("./routes/user-routes");
const PublishersRouter = require("./routes/publishers-routes");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(json());

app.get("/", (req, res) => {
  res.status(200).send({
    data: "Connected!",
  });
});

app.use("/users", UserRouter);
app.use("/publishers", PublishersRouter);

module.exports = app;
