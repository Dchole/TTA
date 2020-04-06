import React, { useContext } from "react"
import Dialog from "@material-ui/core/Dialog"
import {
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography
} from "@material-ui/core"
import { taskContext } from "../context/taskContext"

const ConfirmDelete = ({ open, handleClose, task_id }) => {
  const { handleDelete } = useContext(taskContext)

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText component="div">
          <Typography variant="h6" component="p" color="textPrimary">
            Are you sure you want to delete this task?
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={_ => {
            handleDelete(task_id)
            handleClose()
          }}
          variant="contained"
          color="primary"
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDelete
