const mongoose = require("mongoose");

module.exports.connectionDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/SarahaApp")
    .then(() => console.log("Database connected"))
    .catch((err) => console.log("Connection error", err));
};
