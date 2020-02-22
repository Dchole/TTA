import React, { useState } from "react"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"
import TaskForm from "./TaskForm"

const AddTask = () => {
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)

  return (
    <div
      style={{
        width: "100%",
        position: "fixed",
        bottom: "15%",
        left: "85%"
      }}
    >
      <Fab color="primary" onClick={_ => setOpen(true)}>
        <AddIcon />
      </Fab>
      <TaskForm open={open} handleClose={handleClose} />
    </div>
  )
}

export default AddTask
