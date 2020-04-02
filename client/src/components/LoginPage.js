import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Grid, Container, Paper, Hidden } from "@material-ui/core"
import Intro from "./Intro"
import Login from "./Login"
import { motion } from "framer-motion"
import { useLocation } from "react-router"

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center"
  }
}))

const pageVariants = {
  in: { transform: "rotateY(0deg)" },
  out: { transform: "rotateY(90deg)" }
}

const LoginPage = () => {
  const location = useLocation()
  const classes = useStyles()

  return (
    <motion.div
      initial={
        location.state && location.state.prevPath === "/register" ? "out" : "in"
      }
      animate="in"
      exit="out"
      variants={pageVariants}
      className={classes.root}
    >
      <Container maxWidth="md">
        <Paper>
          <Grid container>
            <Grid style={{ zIndex: 1000 }} item xs={12} sm={6}>
              <Hidden smDown>
                <Intro />
              </Hidden>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Login />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </motion.div>
  )
}

export default LoginPage
