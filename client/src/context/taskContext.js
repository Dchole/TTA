import React, { createContext, useState, useEffect, useContext } from "react"
import Axios from "axios"
import { userContext } from "./userContext"

export const taskContext = createContext()

const TaskContextProvider = props => {
  const [tasks, setTasks] = useState([])
  const [state, setState] = useState({
    loading: false,
    error: ""
  })

  const [feedback, setFeedback] = useState({
    open: false,
    message: ""
  })

  const {
    state: { token }
  } = useContext(userContext)

  const tokenConfig = () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`
      }
    }

    return config
  }

  const fetchTasks = async () => {
    try {
      setState({ ...state, loading: true })
      const res = await Axios.get("/api/tasks", tokenConfig())
      const data = res.data
      setState({ loading: false, error: "" })
      setTasks(data)
    } catch (err) {
      console.log(err.response.data)
      setState({ loading: false, error: err.response.message })
    }
  }

  const addTask = async task => {
    try {
      setState({ ...state, loading: true })
      const res = await Axios.post("/api/tasks", task, tokenConfig())
      const data = res.data
      setFeedback({ open: true, message: "Task added Successfully!" })
      setState({ loading: false, error: "" })
      setTasks([data, ...tasks])
    } catch (err) {
      setState({ loading: false, error: err.response.message })
    }
  }

  const editTask = async (id, task) => {
    try {
      setState({ ...state, loading: true })
      await Axios.put(`/api/tasks/${id}`, task, tokenConfig())
      setFeedback({ open: true, message: "Task Updated Successfully!" })
      setState({ loading: false, error: "" })
    } catch (err) {
      setState({ loading: false, error: err.response.message })
    }
  }

  const deleteTask = async id => {
    try {
      const res = await Axios.delete(`/api/tasks/${id}`, tokenConfig())
      const data = res.data
      setFeedback({ open: true, message: data.message })
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const handleDelete = id => {
    deleteTask(id)
    const cpTasks = tasks.filter(task => task._id !== id)
    setState({ ...state, error: "" })
    setTasks([...cpTasks])
  }

  const handleCompleted = id => {
    const cpTasks = [...tasks]
    const task = cpTasks.find(task => task._id === id)
    task.status = !task.status
    editTask(id, task)
    setState({ ...state, error: "" })
    setTasks([...cpTasks])
  }

  const handleTaskUpdate = (id, updatedTask) => {
    const cpTasks = [...tasks]

    const task = cpTasks.find(task => task._id === id)
    cpTasks[cpTasks.indexOf(task)] = updatedTask

    editTask(id, updatedTask)
    setState({ ...state, error: "" })
    setTasks([...cpTasks])
  }

  ;(function() {
    const today = new Date()

    for (const task of tasks) {
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
        tasks,
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
