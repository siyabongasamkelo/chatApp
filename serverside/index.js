const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./Routes/userRoutes");
const chatRouter = require("./Routes/ChatRoutes");
const messageRouter = require("./Routes/messageRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);
app.use("/api/messages", messageRouter);

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URL;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

mongoose
  .connect(uri, {})
  .then(() => {
    console.log("mongodb connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
