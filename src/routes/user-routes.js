const Router = require("express").Router;


// use the controller for each route
const userController = require("../controllers/user-controller");

const userRouter = Router();

userRouter.get("/users", userController.getUsers);
userRouter.get("/users/:userId", userController.getSingleUser);
userRouter.patch("/users/:userId", userController.updateUser);
userRouter.post("/users", userController.createUser);
userRouter.delete("/users/:userId", userController.deleteUser);


module.exports = userRouter;