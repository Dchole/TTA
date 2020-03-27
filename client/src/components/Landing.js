import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Paper, Container } from "@material-ui/core"
import Intro from "./Intro"

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}))

const Landing = props => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Paper style={{ height: "65vh" }}>
          <Intro {...props} />
        </Paper>
      </Container>
    </div>
  )
}

export default Landing
