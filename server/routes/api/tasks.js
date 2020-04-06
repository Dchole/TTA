const router = require("express").Router()
const Task = require("../../models/task")
const authenticate = require("../middleware/auth")

router.get("/", authenticate, async (req, res) => {
  try {
    const tasks = await Task.find().where({ creator: req.user.id })
    res.json(tasks.reverse())
  } catch (err) {
    res.send(err)
    console.log(err)
  }
})

router.post("/", authenticate, async (req, res) => {
  const task = new Task({
    title: req.body.title,
    status: req.body.status,
    expTime: req.body.expTime,
    description: req.body.description,
    creator: req.user.id
  })

  try {
    const savedTask = await task.save()
    res.json(savedTask)
  } catch (err) {
    res.send(err)
    console.log(err)
  }
})

router.put("/:id", authenticate, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body)
    res.json(task)
  } catch (err) {
    res.send(err)
    console.log(err)
  }
})

router.delete("/:id", authenticate, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id)
    res.json({ message: "Delete Successful!" })
  } catch (err) {
    res.send(err)
    console.log(err)
  }
})

module.exports = router
