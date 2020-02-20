const router = require("express").Router()
const Task = require("../../models/task")

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find()
    res.json(tasks.reverse())
  } catch (err) {
    res.send(err)
    console.log(err)
  }
})

router.post("/", async (req, res) => {
  const task = new Task({
    title: req.body.title,
    status: req.body.status,
    expTime: req.body.expTime,
    description: req.body.description
  })

  try {
    const savedTask = await task.save()
    res.json(savedTask)
  } catch (err) {
    res.send(err)
    console.log(err)
  }
})

router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body)
    res.json(task)
  } catch (err) {
    res.send(err)
    console.log(err)
  }
})

router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id)
    res.json({ message: "Delete Successful!" })
  } catch (err) {
    res.send(err)
    console.log(err)
  }
})

module.exports = router
