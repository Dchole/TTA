import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Grid, Paper, Container, Typography, Button } from "@material-ui/core"
import { Route } from "react-router-dom"
import { blue, cyan } from "@material-ui/core/colors"

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  start: {
    backgroundImage: `linear-gradient(-45deg,${blue["A700"]},${cyan.A200})`,
    height: "65vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "120px 90px 120px 90px",
    color: "white"
  }
}))

const Forms = props => {
  const { login, register } = props
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Paper style={{ height: "65vh" }}>
          <Grid container>
            <Grid item xs={12}>
              <Route path="/signin" render={() => login} />
              <div className={classes.start}>
                <Typography variant="h5" align="center">
                  Good Morning
                  <span role="img" aria-label="morning-cloud-emoji">
                    ⛅
                  </span>
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  <Typography variant="body2" align="center">
                    Hello User{" "}
                    <span role="img" aria-label="smiley-face-emoji">
                      🙂
                    </span>
                    , Welcome to{" "}
                    <span style={{ fontWeight: "bolder" }}>Time Gap</span>
                    . <br />
                    Join us now and experience a new life{" "}
                    <span role="img" aria-label="smiley-face-emoji">
                      🙃
                    </span>
                  </Typography>
                  <br />
                  <Button
                    variant="outlined"
                    color="inherit"
                    style={{ width: 100 }}
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Route path="/signup" render={() => register} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  )
}

export default Forms
