import React, { useContext } from "react"
import Appbar from "./components/Appbar"
import TodoList from "./components/TodoList"
import AddTask from "./components/AddTask"
import {
  Typography,
  CssBaseline,
  Container,
  MuiThemeProvider
} from "@material-ui/core"
import { themeContext } from "./context/themeContext"

const App = () => {
  const { theme } = useContext(themeContext)

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
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
    </MuiThemeProvider>
  )
}

export default App
