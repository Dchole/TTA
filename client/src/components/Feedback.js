import React, { useContext } from "react"
import { Snackbar } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import { taskContext } from "../context/taskContext"

const Feedback = () => {
  const { feedback, setFeedback } = useContext(taskContext)

  return (
    <Snackbar
      open={feedback.open}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      autoHideDuration={3000}
      onClose={_ => setFeedback({ ...feedback, open: false })}
    >
      <Alert severity="success">{feedback.message}</Alert>
    </Snackbar>
  )
}

export default Feedback
