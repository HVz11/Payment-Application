const express = require("express");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cors = require("cors");
const rootRouter = require("./routes/index");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

const DB = process.env.MONGODB_URL;
mongoose
  .connect(DB)
  .then(() => {
    console.log("Database connected.");
  })
  .catch((err) => {
    console.log("Database error");
    console.log(err);
  });

app.listen(port, () => {
  console.log("The server is up and running at port 5000");
});
