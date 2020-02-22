import React, { useContext } from "react"
import { taskContext } from "../context/taskContext"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  FormControlLabel,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  Fab,
  List,
  ListItem,
  Switch
} from "@material-ui/core"

const TodoList = () => {
  const { tasks, handleDelete, handleCompleted } = useContext(taskContext)

  const completedStyles = {
    fontStyle: "italic",
    textDecoration: "line-through",
    opacity: 0.5
  }

  return (
    <List>
      {tasks.map(task => (
        <ListItem key={task._id}>
          <ExpansionPanel style={{ width: "100%" }}>
            <ExpansionPanelSummary>
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
              <FormControlLabel
                aria-label="Task Status"
                onChange={_ => handleCompleted(task._id)}
                control={
                  <Switch
                    color="primary"
                    checked={task.status}
                    onChange={_ => handleCompleted(task._id)}
                  />
                }
              />
              <IconButton onClick={_ => handleDelete(task._id)}>
                <DeleteIcon color="secondary" />
              </IconButton>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                align="center"
                component="p"
                style={{ width: "100%" }}
              >
                {task.description}
              </Typography>
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
              <Typography
                variant="caption"
                color={task.status ? "textSecondary" : "primary"}
                component="small"
                style={{ marginLeft: 20, flexGrow: 1, fontWeight: "bolder" }}
              >
                {new Date(task.expTime).toDateString()}
              </Typography>
              <Fab
                size="small"
                color="primary"
                style={{ margin: 15 }}
                disabled={task.status}
              >
                <EditIcon fontSize="small" />
              </Fab>
            </ExpansionPanelActions>
          </ExpansionPanel>
        </ListItem>
      ))}
    </List>
  )
}

export default TodoList
