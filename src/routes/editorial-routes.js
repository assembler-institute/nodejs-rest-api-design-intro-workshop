const Router = require("express").Router;

const editorialController = require("../controllers/editorial-controller");

const editorialRouter = Router();


editorialRouter.post("/editorials", editorialController.createEditorial);
editorialRouter.get("/editorials", editorialController.getEditorials);
editorialRouter.get("/editorials/:editorialId", editorialController.getSingleEditorial);
editorialRouter.patch("/editorials/:editorialId", editorialController.updateEditorial);
editorialRouter.delete("/editorials/:editorialId", editorialController.deleteEditorial);


module.exports = editorialRouter;