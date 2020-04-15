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
    user: {}
  })

  const [feedback, setFeedback] = useState({
    msg: null,
    error: {}
  })

  const refresh = async () => {
    try {
      setState({ ...state, isLoading: true })
      const res = await Axios("/api/user/token", {
        method: "POST",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      })

      const { data } = res
      setState({
        ...state,
        token: data.accessToken,
        isLoading: false
      })
      setFeedback({ ...feedback, error: {} })
      fetchUser(data.accessToken)
    } catch (err) {
      console.log(err.response)
      setState({ ...state, isLoading: false })
      setFeedback({ ...feedback, error: err.response })
    }
  }

  const fetchUser = async token => {
    try {
      setState({ ...state, isLoading: true })
      const res = await Axios("/api/user/getUser", {
        method: "GET",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        }
      })

      const { data } = res
      setState({
        ...state,
        user: data,
        isAuthenticated: true,
        isLoading: false,
        token
      })
      setFeedback({ ...feedback, error: {} })
    } catch (err) {
      console.log(err.response)
      setState({ ...state, isLoading: false })
      setFeedback({ ...feedback, error: err.response })
    }
  }

  const handleFormSubmit = async (cred, url) => {
    try {
      setState({ ...state, isLoading: true })
      const body = JSON.stringify(cred)
      const res = await Axios(`/api/user/${url}`, {
        method: "POST",
        data: body,
        headers: { "Content-Type": "application/json" }
      })
      const { data } = res
      if (url === "/login") {
        setState({
          ...state,
          token: data.accessToken,
          isAuthenticated: true,
          isLoading: false
        })
        setFeedback({ ...feedback, error: {} })
        fetchUser(data.accessToken)
        history.replace("/home")
      } else {
        setFeedback({ msg: data.message, error: {} })
      }
    } catch (err) {
      console.log(err.response)
      setState({ ...state, isLoading: false })
      setFeedback({ ...feedback, error: err.response })
    }
  }

  useEffect(() => {
    refresh()
  }, [state.isAuthenticated])

  return (
    <userContext.Provider
      value={{ state, handleFormSubmit, feedback, refresh }}
    >
      {props.children}
    </userContext.Provider>
  )
}

export default UserContextProvider
