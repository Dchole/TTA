import React, { useContext, useState } from "react"
import Appbar from "./components/Appbar"
import TodoList from "./components/TodoList"
import AddTask from "./components/AddTask"
import {
  Typography,
  CssBaseline,
  Container,
  MuiThemeProvider,
  CircularProgress
} from "@material-ui/core"
import { themeContext } from "./context/themeContext"
import { taskContext } from "./context/taskContext"
import Feedback from "./components/Feedback"

const style = {
  position: "fixed",
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "inset 100px 10px 10px 10px #333"
}

const App = () => {
  const { theme } = useContext(themeContext)
  const { loading, error } = useState(taskContext)

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {loading ? (
        <div style={style}>
          {console.log("loading")}
          <CircularProgress />
        </div>
      ) : null}
      {error ? (
        <Typography variant="h1" color="error" align="center">
          {error}
        </Typography>
      ) : (
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
      )}
    </MuiThemeProvider>
  )
}

export default App
