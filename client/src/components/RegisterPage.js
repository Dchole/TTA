import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Grid, Container, Paper, Hidden } from "@material-ui/core"
import Intro from "./Intro"
import Register from "./Register"
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

const RegisterPage = () => {
  const location = useLocation()
  const classes = useStyles()
  console.log(location)

  return (
    <motion.div
      initial={
        location.state && location.state.prevPath === "/login" ? "out" : "in"
      }
      animate="in"
      exit="out"
      variants={pageVariants}
      className={classes.root}
    >
      <Container maxWidth="md">
        <Paper>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Register />
            </Grid>
            <Grid style={{ zIndex: 1000 }} item xs={12} sm={6}>
              <Hidden smDown>
                <Intro />
              </Hidden>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </motion.div>
  )
}

export default RegisterPage
