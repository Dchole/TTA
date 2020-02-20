import React, { useState } from "react"
import "./styles/styles.css"
import Appbar from "./components/Appbar"
import TodoList from "./components/TodoList"
import AddTask from "./components/AddTask"
import Modal from "./components/Modal"

const App = () => {
  const [display, setDisplay] = useState(false)

  return (
    <div className="External">
      <Appbar />
      <Modal display={display} setDisplay={setDisplay} />
      <div className="App">
        <h1>The Todo App</h1>
        <TodoList />
        <AddTask setDisplay={setDisplay} />
      </div>
    </div>
  )
}

export default App
