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
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Landing from "./components/Landing"
import Forms from "./components/Forms"

const App = () => {
  const { theme } = useContext(themeContext)

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path="/" render={props => <Landing {...props} />} exact />
          <Route path="/register" render={props => <Forms {...props} />} />
          <Route path="/login" render={props => <Forms {...props} />} />
          <Route
            path="/home"
            render={() => (
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
          />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}

export default App
