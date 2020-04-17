import React, { useContext } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { MuiThemeProvider } from "@material-ui/core"
import { themeContext } from "./context/themeContext"
import { Route, Switch } from "react-router-dom"
import RegisterPage from "./components/RegisterPage"
import LoginPage from "./components/LoginPage"
import { AnimatePresence } from "framer-motion"
import Homepage from "./components/Homepage"

const App = () => {
  const { theme } = useContext(themeContext)

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AnimatePresence>
        <Switch>
          <Route path="/" component={Homepage} exact />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </AnimatePresence>
    </MuiThemeProvider>
  )
}

export default App
