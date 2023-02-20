const { PostModel } = require("../models/postmodel.js");

const express = require("express");

const postrouter = express.Router();

const { authenticate } = require("../middleware/authenticate.js");

postrouter.use(authenticate);

postrouter.get("/posts", async (req, res) => {
  const { query } = req.query;

  const device1 = req.query.device1;
  const device2 = req.query.device2;

  try {
    if (device1 && device2) {
      const data = await PostModel.find(
        { device: device1 },
        { device: device2 }
      );
      res.send(data);
    } else {
      const data = await PostModel.find({ query });
    }

    res.send(data);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

postrouter.get("/posts/top", async (req, res) => {
  try {
    const data = await PostModel.findOne().sort({ no_of_comments: -1 });
    res.send(data);
  } catch (error) {
    res.send(error);
    console.log(err);
  }
});

postrouter.post("/posts/add", async (req, res) => {
  try {
    const data = req.body;
    const adata = await new PostModel(data);
    adata.save();
    res.send("data added successfully");
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

postrouter.patch("/posts/update/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  try {
    const data = await PostModel.findByIdAndUpdate({ _id: ID }, payload);
    res.send("data updated successfully");
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

postrouter.delete("/posts/delete/:id", async (req, res) => {
  const ID = req.params.id;

  try {
    const data = await PostModel.findByIdAndDelete({ _id: ID });
    res.send("data deleted successfully");
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

module.exports = {
  postrouter,
};
