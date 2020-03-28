import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import TaskContextProvider from "./context/taskContext"
import ThemeContextProvider from "./context/themeContext"
import UserContextProvider from "./context/userContext"

ReactDOM.render(
  <ThemeContextProvider>
    <UserContextProvider>
      <TaskContextProvider>
        <App />
      </TaskContextProvider>
    </UserContextProvider>
  </ThemeContextProvider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
