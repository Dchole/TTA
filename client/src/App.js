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
import { Route, Switch, Redirect } from "react-router-dom"
import Landing from "./components/Landing"
import RegisterPage from "./components/RegisterPage"
import LoginPage from "./components/LoginPage"
import { AnimatePresence } from "framer-motion"
import { userContext } from "./context/userContext"

const App = () => {
  const { theme } = useContext(themeContext)
  // const { isAuthenticated } = useContext(userContext)

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AnimatePresence>
        <Switch>
          <Route path="/" component={Landing} exact />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
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
      </AnimatePresence>
    </MuiThemeProvider>
  )
}

export default App
