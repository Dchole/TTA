import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { List, ListItem, IconButton } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import AccountIcon from "@material-ui/icons/Person"
import Brightness7Icon from "@material-ui/icons/Brightness7"
import { themeContext } from "../context/themeContext"

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "100%"
  }
}))

export default () => {
  const classes = useStyles()
  const { handleTheme } = useContext(themeContext)

  const navList = [
    <MenuIcon />,
    <Brightness7Icon fontSize="large" />,
    <AccountIcon />
  ]

  return (
    <List className={classes.root}>
      {navList.map((member, index) => (
        <ListItem key={index} style={{ justifyContent: "center" }}>
          <IconButton onClick={index === 1 ? handleTheme : null}>
            {member}
          </IconButton>
        </ListItem>
      ))}
    </List>
  )
}
