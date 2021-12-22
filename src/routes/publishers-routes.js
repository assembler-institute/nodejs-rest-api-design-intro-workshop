const Router = require("express").Router;

const publishersController = require("../controllers/publishers-controller");

const PublishersRouter = Router();

PublishersRouter.get("/", publishersController.getPublishers);

PublishersRouter.get(
  "/:publishersId",
  publishersController.getPublishersDetails,
);

PublishersRouter.post("/", publishersController.createPublishers);

PublishersRouter.patch("/:publishersId", publishersController.updatePublishers);

PublishersRouter.delete(
  "/:publishersId",
  publishersController.deletePublishers,
);

module.exports = PublishersRouter;
