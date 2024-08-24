const express = require("express");
const User = require("./connection/models/user.model.js");
const { connectionDB } = require("./connection/connectionDB.js");
const userRouter = require("./src/modules/users/users.routes.js");

const session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);

const app = express();
const port = 3000;

connectionDB();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

var store = new MongoDBStore({
  uri: "mongodb://localhost:27017/SarahaApp",
  collection: "mySessions",
});

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use("/", userRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));