import React, { useContext, useState } from "react"
import { taskContext } from "../context/taskContext"

const styles = {
  color: "#333",
  fontStyle: "italic",
  textDecoration: "line-through",
  opacity: 0.5
}

const TodoList = () => {
  const { tasks, handleDelete, handleCompleted } = useContext(taskContext)
  const [expanded, setExpanded] = useState([])

  return (
    <ul className="tasks-list">
      {tasks.map(task => (
        <li key={task._id}>
          <span
            onClick={_ => {
              const cpExpanded = [...expanded]
              cpExpanded.splice(cpExpanded.indexOf(task._id), 1)
              expanded.includes(task._id)
                ? setExpanded(cpExpanded)
                : setExpanded([...expanded, task._id])
            }}
          >
            <p id="title" style={task.status ? styles : null}>
              {task.title}
            </p>
            {expanded.includes(task._id) ? (
              <div>
                <p>Time: {task.expTime}</p>
                <p>Description: {task.description}</p>
                <p>Status: {task.status ? "Completed" : "Not Completed"}</p>
              </div>
            ) : null}
          </span>
          <input
            type="checkbox"
            checked={task.status}
            onChange={() => handleCompleted(task._id)}
          />
          <button onClick={() => handleDelete(task._id)}>x</button>
        </li>
      ))}
    </ul>
  )
}

export default TodoList
