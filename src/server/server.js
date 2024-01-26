const express = require("express");
require("dotenv").config();
const cors = require("cors");
const user = require("./routes/user");
const post = require("./routes/post");

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

//calling Database function
require("./config/database").connect();

//route importing and mounting

app.use("/api/user", user);
app.use("/api/post", post);

app.listen(PORT, () => {
  console.log("Server Started");
});
