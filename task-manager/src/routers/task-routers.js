const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const User = require("../models/User");
const { findOneAndDelete } = require("../models/task");
const router = new express.Router()

router.use(express.json());

router.post("/task",auth,  async (req, res) => {
  const task = new Task({
    ...req.body,
    owner : req.user._id
  })

  try {
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e.message);
  }
});
router.get("/tasks", auth,async (req, res) => {
  const match = {}
  const sort = {}
if(req.query.status){
  match.status = req.query.status === 'true'
}

if(req.query.sortBy){
  const parts = req.query.sortBy.split(":")
  sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
}
  try {
    const user = await req.user.populate({
      path : 'tasks',
      match,
      options : {
        limit : parseInt(req.query.limit),
        skip : parseInt(req.query.skip),
        sort 
      }
    }).execPopulate()
    res.send(user.tasks);
  } catch (e) {
    res.send(e.message);
  }
});

router.get("/task/:id",  auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({_id, owner : req.user._id})
    res.send(task);
  } catch (e) {
    res.status(404).send("Not found");
  }
});

router.patch("/task/:id", auth,  async (req, res) => {
  const tasks = Object.keys(req.body);
  const allowedTasks = ["status", "description"];
  const task = tasks.find((task) => {
    if (!allowedTasks.includes(task)) {
      return true;
    }
  });
  if (task) {
    return res.status(406).send("Not Allowed");
  }
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.send(task);
  } catch (e) {
    res.send(e.message);
  }
});

router.delete("/task/:id", auth, async (req, res) => {
  try {
   await Task.findOneAndDelete({_id : req.params.id, owner: req.user._id})
    res.send("Success");
  } catch (e) {
    console.log(e)
    res.status(500).send();
  }
});

module.exports = router
