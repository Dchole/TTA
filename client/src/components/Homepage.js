import React, { useContext } from "react"
import { Redirect } from "react-router"
import { userContext } from "../context/userContext"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import TodoList from "./TodoList"
import AddTask from "./AddTask"
import Feedback from "./Feedback"
import Appbar from "./Appbar"

const Homepage = () => {
  const {
    state: { isAuthenticated }
  } = useContext(userContext)

  if (!isAuthenticated) return <Redirect to="/register" />
  return (
    <>
      <Appbar />
      <Container maxWidth="md">
        <br />
        <Typography variant="h4" align="center">
          The Todo App
        </Typography>
        <br />
        <TodoList />
      </Container>
      <AddTask />
      <Feedback />
    </>
  )
}

export default Homepage
