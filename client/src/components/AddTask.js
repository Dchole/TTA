import React from "react"
import { Fab } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"

const AddTask = () => (
  <div
    style={{
      width: "100%",
      position: "fixed",
      bottom: "15%",
      left: "85%"
    }}
  >
    <Fab color="primary">
      <AddIcon />
    </Fab>
  </div>
)

export default AddTask
