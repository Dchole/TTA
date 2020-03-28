import React, { createContext, useEffect, useState } from "react"
import Axios from "axios"
import { useHistory } from "react-router"

export const userContext = createContext()

const UserContextProvider = props => {
  const history = useHistory()
  const [state, setState] = useState({
    token: null,
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
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }

    setState(prevState => ({
      ...prevState,
      token: localStorage.getItem("token")
    }))

    if (state.token) {
      config.headers["authorization"] = `Bearer ${state.token}`
    }
    return config
  }

  const fetchUser = async () => {
    try {
      setState(prevState => ({ ...prevState, isLoading: true }))
      const res = await Axios.get("/api/user/getUser", tokenConfig().headers)
      const { data } = res
      setState(prevState => ({
        ...prevState,
        isAuthenticated: true,
        isLoading: false,
        user: data
      }))
      console.log(data)
    } catch (err) {
      console.error(err.response.data)
    }
  }

  const handleFormSubmit = async (cred, url) => {
    try {
      const body = JSON.stringify(cred)
      const res = await Axios.post(`/api/user${url}`, body, tokenConfig())
      const { data } = res
      if (url === "/login") {
        localStorage.setItem("token", data.accessToken)
        fetchUser()
        history.replace("/home")
      } else setFeedback({ msg: data.message, error: null, errPath: null })
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
  }, [])

  return (
    <userContext.Provider value={{ state, handleFormSubmit, feedback }}>
      {props.children}
    </userContext.Provider>
  )
}

export default UserContextProvider
