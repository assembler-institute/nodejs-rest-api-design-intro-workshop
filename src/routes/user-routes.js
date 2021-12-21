const Router = require("express").Router;

const { authMiddleware } = require("../middleware/auth-middleware");
const userController = require("../controllers/user-controller");

const UserRouter = Router();

// A shorter way of using auth for all the endpoints controlled
// by this router is to define the auth middleware on it
// instead of on each route handler
UserRouter.use("/", authMiddleware);

UserRouter.get("/", userController.getUsers);
UserRouter.get("/:userId", userController.getUserDetails);
UserRouter.post("/", userController.createUser);
UserRouter.patch("/:userId", userController.updateUser);
UserRouter.delete("/:userId", userController.deleteUser);

UserRouter.post("/sign-up", authMiddleware, userController.signUp);

module.exports = UserRouter;
