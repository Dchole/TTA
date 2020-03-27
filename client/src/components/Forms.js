import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Grid, Container, Paper } from "@material-ui/core"
import Intro from "./Intro"
import Register from "./Register"
import Login from "./Login"

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center"
  }
}))

const Forms = props => {
  const {
    location: { pathname }
  } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Paper>
          <Grid container>
            <Grid item xs={6}>
              {pathname === "/register" ? <Register /> : <Intro {...props} />}
            </Grid>
            <Grid item xs={6}>
              {pathname === "/login" ? <Login /> : <Intro {...props} />}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  )
}

export default Forms
