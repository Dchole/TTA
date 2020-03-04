import React, { createContext, useState, useEffect } from "react"
import Axios from "axios"

export const taskContext = createContext()

const TaskContextProvider = props => {
  const [state, setState] = useState({
    loading: false,
    tasks: [],
    error: ""
  })
  const [feedback, setFeedback] = useState({
    open: false,
    message: ""
  })

  const fetchTasks = async () => {
    try {
      setState({ ...state, loading: true })
      const res = await Axios.get("/api/tasks")
      const data = res.data
      setState({ loading: false, tasks: data, error: "" })
    } catch (err) {
      console.log(err.response)
      setState({ ...state, loading: false, error: err.response.message })
    }
  }

  const addTask = async task => {
    try {
      setState({ ...state, loading: true })
      const res = await Axios.post("/api/tasks", task)
      const data = res.data
      setFeedback({ open: true, message: "Task added Successfully!" })
      setState({ loading: false, tasks: [data, ...state.tasks], error: "" })
    } catch (err) {
      console.log(err.response.data)
      setState({ ...state, loading: false, error: err.response.message })
    }
  }

  const editTask = async (id, task) => {
    try {
      setState({ ...state, loading: true })
      await Axios.put(`/api/tasks/${id}`, task)
      setFeedback({ open: true, message: "Task Updated Successfully!" })
      setState({ ...state, loading: false })
    } catch (err) {
      console.log(err.response.data)
      setState({ ...state, loading: false, error: err.response.message })
    }
  }

  const deleteTask = async id => {
    try {
      const res = await Axios.delete(`/api/tasks/${id}`)
      const data = res.data
      setFeedback({ open: true, message: data.message })
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const handleDelete = id => {
    deleteTask(id)
    const cpTasks = state.tasks.filter(task => task._id !== id)
    setState({ ...state, tasks: [...cpTasks], error: "" })
  }

  const handleCompleted = id => {
    const cpTasks = [...state.tasks]
    const task = cpTasks.find(task => task._id === id)
    task.status = !task.status
    editTask(id, task)
    setState({ ...state, tasks: [...cpTasks], error: "" })
  }

  const handleTaskUpdate = (id, updatedTask) => {
    const cpTasks = [...state.tasks]

    const task = cpTasks.find(task => task._id === id)
    cpTasks[cpTasks.indexOf(task)] = updatedTask

    editTask(id, updatedTask)
    setState({ ...state, tasks: [...cpTasks], error: "" })
  }

  ;(function() {
    const today = new Date()

    for (const task of state.tasks) {
      if (
        today.getDate() - new Date(task.expTime).getDate() >= 1 &&
        today.getHours() >= new Date(task.expTime).getHours() &&
        task.status
      ) {
        deleteTask(task._id)
      }
    }
  })()

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <taskContext.Provider
      value={{
        state,
        addTask,
        feedback,
        setFeedback,
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
