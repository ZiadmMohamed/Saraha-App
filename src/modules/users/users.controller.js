const session = require("express-session");
const User = require("../../../connection/models/user.model.js");
const messageModel = require("../../../connection/models/message.model.js");

module.exports.index = async (req, res) => {
  res.render("index.ejs");
};

module.exports.register = async (req, res) => {
  const { error } = req.query;

  res.render("register.ejs", { error });
};

module.exports.addUser = async (req, res) => {
  const { name, email, password } = req.body;
  if ((!name, !email, !password)) {
    return res.redirect("/register?error=inputs is required");
  }

  const emailExist = await User.findOne({ email });
  if (emailExist) {
    return res.redirect("/register?error='User Already Exist'");
  }
  await User.create({ name, email, password });
  return res.redirect("/login");
};

module.exports.login = async (req, res) => {
  if (req.session.logedIn) {
    res.redirect("messages");
  }
  const { error } = req.query;
  res.render("login.ejs", { error });
};

module.exports.handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    return res.redirect("/login?error=inputs is required");
  }

  const emailExist = await User.findOne({ email });
  if (!emailExist) {
    return res.redirect("/login?error=signUp first");
  }
  if (emailExist.password != password) {
    return res.redirect("/login?error=password is't correct");
  }

  // res.setHeader("set-cookie", "userId=" + emailExist._id);

  req.session.userId = emailExist._id;
  req.session.name = emailExist.name;
  req.session.logedIn = true;

  return res.redirect("/messages");
};

module.exports.messages = async (req, res) => {
  // if (req.get("cookie")) {
  //   res.render("messages.ejs");
  // } else {
  //   res.redirect("/login");
  // }
  const messages = await messageModel.find({ userId: req.session.userId });
  const url = `${req.protocol}://${req.headers.host}/user/${req.session.userId}`;

  if (req.session.logedIn) {
    res.render("messages.ejs", { session: req.session, url, messages });
  } else {
    res.redirect("/login");
  }
};

module.exports.user = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json("usr not exist");
  }
  res.render("user.ejs", { user });
};

module.exports.logOut = async (req, res) => {
  req.session.destroy(function (err) {
    res.redirect("/login");
  });
};

module.exports.sendMsg = async (req, res) => {
  const { userId } = req.params;

  await messageModel.create({ content: req.body.msg, userId });

  res.redirect(`/user/${userId}`);
};
