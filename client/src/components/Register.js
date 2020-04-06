import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { useState } from "react"
import { userContext } from "../context/userContext"

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function SignUp({ path }) {
  const classes = useStyles()
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const {
    handleFormSubmit,
    feedback: { error, errPath }
  } = useContext(userContext)

  const handleInput = field => event => {
    setState({ ...state, [field]: event.target.value })
  }

  const handleSubmit = () => {
    handleFormSubmit(state, path)
  }

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form
        className={classes.form}
        noValidate
        onSubmit={e => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              error={error && errPath === "username" ? true : false}
              helperText={error && errPath === "username" ? error : null}
              autoComplete="username"
              name="username"
              variant="outlined"
              required
              fullWidth
              id="username"
              label="Username"
              autoFocus
              value={state.username}
              onChange={handleInput("username")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={error && errPath === "email" ? true : false}
              helperText={error && errPath === "email" ? error : null}
              autoComplete="email"
              name="email"
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email"
              value={state.email}
              onChange={handleInput("email")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={error && errPath === "password" ? true : false}
              helperText={error && errPath === "password" ? error : null}
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={state.password}
              onChange={handleInput("password")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={error && errPath === "confirmPassword" ? true : false}
              helperText={error && errPath === "confirmPassword" ? error : null}
              variant="outlined"
              required
              fullWidth
              name="confirm_password"
              label="Confirm Password"
              type="password"
              id="confirm_password"
              autoComplete="confirm_password"
              value={state.confirmPassword}
              onChange={handleInput("confirmPassword")}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="#" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
