const express = require("express");
const mongoose = require("mongoose");
const path = require("node:path");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.DBURI)
  .then(() => console.log("DB Connected"))
  .catch((error) => console.error(error));

app.use("/", require("./routes/route"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
