const express = require('express')
const route = express.Router()
const task = require('../models/task.model')


route.post("/api/task", async (req, res) => {
  try {
    const taskData =  new task(req.body);
    await taskData.save();
    res.status(200);
    console.log("data saved");
  } catch (error) {
    res.status(500).send("intarnal server error:", error);
    console.log(error);
  }
});


route.get("/api/task", async (req, res) => {
  try {
    let data = await task.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("internal server error", error);
  }
});

route.get("/api/task/:priority", async (req, res) => {
  try {
    let priorityType = req.params.priority
    if (priorityType == "High" || priorityType == "Medium" || priorityType == "Low") {
      let response = await task.find({priority : priorityType});
      res.status(200).json(response);
    } else {
      res.status(404).send("invalid priority:");
    }
  } catch (error) {
    res.status(500).send("intrnal server error", error);
  }
});

module.exports = route

