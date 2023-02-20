const { connection } = require("./config/db.js");

const express = require("express");

const { userrouter } = require("./routes/usersroutes.js");

const { postrouter } = require("./routes/postsroutes.js");

const app = express();

app.use(express.json());

app.use(userrouter);

app.use(postrouter);

app.listen(7200, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
  console.log("running at 7200");
});
