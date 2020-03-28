import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import { blue, cyan } from "@material-ui/core/colors"
import { Typography, Button } from "@material-ui/core"
import { userContext } from "../context/userContext"

const useStyles = makeStyles(() => ({
  start: {
    backgroundImage: `linear-gradient(-45deg,${blue["A700"]},${cyan.A200})`,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "130px 90px 130px 90px",
    color: "white"
  }
}))

const Intro = ({ location: { pathname } }) => {
  const classes = useStyles()
  const { state } = useContext(userContext)

  return (
    <>
      <div className={classes.start}>
        <Typography variant="h4" align="center">
          <span role="img" aria-label="morning-cloud-emoji">
            ⛅
          </span>
          <br />
          Good Morning
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
            , Welcome to <span style={{ fontWeight: "bolder" }}>Time Gap</span>
            . <br />
            Join us now and experience a new life{" "}
            <span role="img" aria-label="smiley-face-emoji">
              🙃
            </span>
          </Typography>
          <br />
          <Button
            component={Link}
            to={
              pathname === "/"
                ? "/register"
                : pathname === "/register"
                ? "/login"
                : "/register"
            }
            variant="outlined"
            color="inherit"
            style={{ width: 100 }}
          >
            {pathname === "/"
              ? "Sign Up"
              : pathname === "/register"
              ? "Sign In"
              : "Sign Up"}
          </Button>
        </div>
      </div>
    </>
  )
}

export default Intro
