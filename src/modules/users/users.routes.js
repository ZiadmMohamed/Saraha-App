const { Router } = require("express");
const {
  login,
  register,
  messages,
  user,
  index,
  addUser,
  handleLogin,
  logOut,
  sendMsg,
} = require("./users.controller.js");

const userRouter = Router();

userRouter.get("/", index);

userRouter.get("/user/:userId", user);

userRouter.get("/login", login);

userRouter.post("/handleLogin", handleLogin);

userRouter.get("/register", register);

userRouter.post("/addUser", addUser);

userRouter.post("/sendMsg/:userId", sendMsg);

userRouter.get("/messages", messages);

userRouter.get("/logOut", logOut);

module.exports = userRouter;
