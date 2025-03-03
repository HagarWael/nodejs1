const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT;

const app = express();
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");

mongoose
  .connect("mongodb://127.0.0.1:27017/myNewDatabase")
  .then(() => console.log(" Connected "))
  .catch((err) => console.error("connection error", err));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/post", postRoutes);

app.listen(port);
