import React, { useContext, useState } from "react"
import Typography from "@material-ui/core/Typography"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions"
import Fab from "@material-ui/core/Fab"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Switch from "@material-ui/core/Switch"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import CircularProgress from "@material-ui/core/CircularProgress"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import ConfirmDelete from "./ConfirmDelete"
import DateFnsUtils from "@date-io/date-fns"
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import { taskContext } from "../context/taskContext"

let task_id

const style = {
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "inset 100vw 10px 10px 10px #3333",
  zIndex: 100
}

const TodoList = () => {
  const {
    state: { loading, error },
    tasks,
    handleCompleted,
    handleTaskUpdate
  } = useContext(taskContext)
  const [open, setOpen] = useState(false)
  const [taskUpdate, setTaskUpdate] = useState({
    title: "",
    description: "",
    expTime: "",
    status: ""
  })
  console.log(tasks)
  const [editMode, setEditMode] = useState([])
  const [selectDate, setSelectDate] = useState()

  const completedStyles = {
    fontStyle: "italic",
    textDecoration: "line-through",
    opacity: 0.5
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleInput = (name, task) => event => {
    setTaskUpdate({ ...task, [name]: event.target.value })
  }

  const handleEditMode = task => {
    setSelectDate(task.expTime)
    setEditMode([...editMode, task._id])
  }

  const handleStopEditMode = id => {
    const cpEditMode = [...editMode]
    const restOfMembers = cpEditMode.filter(member => member !== id)
    setEditMode(restOfMembers)
  }

  const today = new Date()

  const formatTime = time => {
    const timeArray = time.toLocaleTimeString().split(":")
    const ampm = timeArray[2].split(" ")[1]
    timeArray.pop()
    const newFormat = `${timeArray.join(":")} ${ampm}`

    return newFormat
  }

  return (
    <>
      {loading ? (
        <div style={style}>
          {console.log("loading")}
          <CircularProgress />
        </div>
      ) : null}
      {error ? (
        <Typography variant="h2" color="error">
          {error}
        </Typography>
      ) : (
        <>
          <List>
            {tasks.length === 0 ? (
              <Typography
                variant="h3"
                color="textSecondary"
                style={{ display: "flex", alignItems: "center" }}
              >
                You haven't scheduled any activity yet.
              </Typography>
            ) : (
              tasks.map(task => (
                <ListItem key={task._id}>
                  <ExpansionPanel style={{ width: "100%" }}>
                    <ExpansionPanelSummary>
                      {editMode.includes(task._id) ? (
                        <div style={{ flexGrow: 1 }}>
                          <TextField
                            name="title"
                            variant="outlined"
                            type="text"
                            size="small"
                            placeholder="Add title"
                            onChange={handleInput("title", task)}
                            onFocus={handleInput("title", task)}
                            defaultValue={task.title}
                            autoFocus
                          />
                        </div>
                      ) : (
                        <Typography
                          variant="h6"
                          style={
                            task.status
                              ? {
                                  ...completedStyles,
                                  flexGrow: 1,
                                  paddingTop: 7,
                                  textTransform: "capitalize"
                                }
                              : {
                                  flexGrow: 1,
                                  paddingTop: 7,
                                  textTransform: "capitalize"
                                }
                          }
                        >
                          {task.title}
                        </Typography>
                      )}
                      <FormControlLabel
                        aria-label="Task Status"
                        onChange={_ => handleCompleted(task)}
                        control={
                          <Switch
                            color="primary"
                            checked={task.status}
                            onChange={_ =>
                              handleCompleted(task._id, taskUpdate)
                            }
                          />
                        }
                      />
                      <IconButton
                        onClick={_ => {
                          task_id = task._id
                          handleOpen()
                        }}
                      >
                        <DeleteIcon color="secondary" />
                      </IconButton>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      {editMode.includes(task._id) ? (
                        <Grid container justify="flex-end">
                          <TextField
                            name="description"
                            type="text"
                            variant="outlined"
                            size="small"
                            placeholder="Description"
                            onChange={handleInput("description", task)}
                            fullWidth
                            multiline
                            rows="4"
                            defaultValue={task.description}
                          />
                        </Grid>
                      ) : (
                        <Typography
                          variant="subtitle2"
                          color="textSecondary"
                          align="center"
                          component="p"
                          style={{ width: "100%" }}
                        >
                          {task.description}
                        </Typography>
                      )}
                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
                      <div
                        style={{
                          marginLeft: 20,
                          flexGrow: 1
                        }}
                      >
                        {editMode.includes(task._id) ? (
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                              variant="inline"
                              value={selectDate}
                              onChange={setSelectDate}
                              onBlur={_ =>
                                setTaskUpdate({ ...task, expTime: selectDate })
                              }
                              onError={console.log}
                              placeholder="Date and Time of activity"
                            />
                          </MuiPickersUtilsProvider>
                        ) : (
                          <Typography
                            variant="caption"
                            color={task.status ? "textSecondary" : "primary"}
                            component="small"
                            style={{ fontWeight: "bolder" }}
                          >
                            {new Date(task.expTime).getDate() ===
                            today.getDate()
                              ? formatTime(new Date(task.expTime))
                              : new Date(task.expTime).toDateString()}
                          </Typography>
                        )}
                      </div>
                      {editMode.includes(task._id) ? (
                        <div style={{ marginTop: 15 }}>
                          <Button
                            color="primary"
                            onClick={_ => handleStopEditMode(task._id)}
                          >
                            Close
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={_ => {
                              handleTaskUpdate(task._id, taskUpdate)
                              handleStopEditMode(task._id)
                            }}
                          >
                            Done
                          </Button>
                        </div>
                      ) : (
                        <Fab
                          size="small"
                          color="primary"
                          style={{ margin: 15 }}
                          disabled={task.status}
                          onClick={_ => handleEditMode(task)}
                        >
                          <EditIcon fontSize="small" />
                        </Fab>
                      )}
                    </ExpansionPanelActions>
                  </ExpansionPanel>
                </ListItem>
              ))
            )}
          </List>
          <ConfirmDelete
            open={open}
            handleClose={handleClose}
            task_id={task_id}
          />
        </>
      )}
    </>
  )
}

export default TodoList
