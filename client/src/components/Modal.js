import React, { useContext, useState } from "react"
import { taskContext } from "../context/taskContext"

const Modal = ({ display, setDisplay }) => {
  const { addTask } = useContext(taskContext)
  const [task, setTask] = useState({
    title: "",
    expTime: "",
    description: "",
    status: false
  })

  const handleInput = name => event => {
    setTask({ ...task, [name]: event.target.value })
  }

  const handleAddTask = task => {
    addTask(task)
    setDisplay(false)
  }

  return (
    <div
      className="modal"
      style={display ? { display: "block" } : { display: "none" }}
    >
      <input
        type="text"
        name="title"
        placeholder="Add Task"
        value={task.title}
        onChange={handleInput("title")}
      />
      <input
        type="text"
        name="expTime"
        placeholder="Date or Time"
        value={task.expTime}
        onChange={handleInput("expTime")}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleInput("description")}
      />
      <button onClick={_ => setDisplay(false)}>Cancel</button>
      <button onClick={_ => handleAddTask(task)}>Done</button>
    </div>
  )
}

export default Modal
