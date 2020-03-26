import React, { useContext } from "react"
import Appbar from "./components/Appbar"
import TodoList from "./components/TodoList"
import AddTask from "./components/AddTask"
import Typography from "@material-ui/core/Typography"
import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"
import Feedback from "./components/Feedback"
import { MuiThemeProvider } from "@material-ui/core"
import { themeContext } from "./context/themeContext"
import { BrowserRouter, Route } from "react-router-dom"
import Login from "./components/Login"

const App = () => {
  const { theme } = useContext(themeContext)

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" component={Login} exact />
        <Route
          path="/home"
          render={() => (
            <>
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
              <Feedback />
            </>
          )}
        />
      </BrowserRouter>
    </MuiThemeProvider>
  )
}

export default App
