import React, { createContext, useEffect, useState } from "react"
import Axios from "axios"
import { useHistory } from "react-router"

export const userContext = createContext()

const UserContextProvider = props => {
  const history = useHistory()
  const [state, setState] = useState({
    token: localStorage.getItem("token") || null,
    isAuthenticated: false,
    isLoading: false,
    user: null
  })

  const [feedback, setFeedback] = useState({
    msg: null,
    error: null,
    errPath: null
  })

  const tokenConfig = () => {
    const token = localStorage.getItem("token")
    setState({ ...state, token })
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    }

    return config
  }

  const fetchUser = async () => {
    try {
      setState(prevState => ({ ...prevState, isLoading: true }))
      const res = await Axios.get("/api/user/getUser", tokenConfig())
      const { data } = res
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        isAuthenticated: true,
        user: data
      }))
    } catch (err) {
      console.error(err.response.data)
    }
  }

  const handleFormSubmit = async (cred, url) => {
    try {
      const body = JSON.stringify(cred)
      setState(prevState => ({ ...prevState, isLoading: true }))
      const res = await Axios.post(`/api/user${url}`, body, tokenConfig())
      const { data } = res
      if (url === "/login") {
        const { accessToken } = data
        localStorage.setItem("token", accessToken)
        fetchUser()
        setState(prevState => ({
          ...prevState,
          isAuthenticated: true,
          isLoading: false
        }))
        history.replace("/home")
      } else {
        setState(prevState => ({ ...prevState, isLoading: false }))
        setFeedback({ msg: data.message, error: null, errPath: null })
        history.replace("/login")
      }
    } catch (err) {
      console.log(err.response)
      setFeedback({
        ...feedback,
        error: err.response.data.message,
        errPath: err.response.data.path
      })
    }
  }

  useEffect(() => {
    fetchUser()
    if (state.isAuthenticated) {
      history.replace("/home")
    }
  }, [])

  return (
    <userContext.Provider value={{ state, handleFormSubmit, feedback }}>
      {props.children}
    </userContext.Provider>
  )
}

export default UserContextProvider
