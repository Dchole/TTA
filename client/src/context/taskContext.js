import React, { createContext, useState, useEffect } from "react"
import Axios from "axios"

export const taskContext = createContext()

const TaskContextProvider = props => {
  const [tasks, setTasks] = useState([])

  const fetchTasks = async () => {
    try {
      const res = await Axios.get("/api/tasks")
      const data = res.data
      setTasks(data)
    } catch (err) {
      console.log(err.response)
    }
  }

  const addTask = async task => {
    try {
      const res = await Axios.post("/api/tasks", task)
      const data = res.data
      setTasks([data, ...tasks])
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const editTask = async (id, task) => {
    try {
      await Axios.put(`/api/tasks/${id}`, task)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const deleteTask = async id => {
    try {
      const res = await Axios.delete(`/api/tasks/${id}`)
      const data = res.data
      console.log(data)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const handleDelete = id => {
    deleteTask(id)
    const cpTasks = tasks.filter(task => task._id !== id)
    setTasks(cpTasks)
  }

  const handleCompleted = id => {
    const cpTasks = [...tasks]
    const task = cpTasks.find(task => task._id === id)
    task.status = !task.status
    editTask(id, task)
    setTasks(cpTasks)
  }

  const handleTaskUpdate = (id, updatedTask) => {
    const cpTasks = [...tasks]

    const task = cpTasks.find(task => task._id === id)
    cpTasks[cpTasks.indexOf(task)] = updatedTask

    editTask(id, updatedTask)
    setTasks(cpTasks)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <taskContext.Provider
      value={{
        tasks,
        addTask,
        handleTaskUpdate,
        handleDelete,
        handleCompleted
      }}
    >
      {props.children}
    </taskContext.Provider>
  )
}

export default TaskContextProvider
