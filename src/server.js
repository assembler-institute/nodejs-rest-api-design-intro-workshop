const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { json } = require("body-parser");
const cors = require("cors");

const UserRouter = require("./routes/user-routes");
const PublishersRouter = require("./routes/publishers-routes");
const config = require("./config/config");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(json());

app.use(
  cors({
    origin: config.client.URL,
  }),
);

app.use("/users", UserRouter);
app.use("/publishers", PublishersRouter);

module.exports = app;
