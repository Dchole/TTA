import React, { createContext, useState } from "react"
import { createMuiTheme } from "@material-ui/core"
import { blue } from "@material-ui/core/colors"

export const themeContext = createContext()

const ThemeContextProvider = props => {
  const [lightMode, setLightMode] = useState(true)
  const theme = createMuiTheme({
    palette: {
      primary: !lightMode
        ? {
            main: blue[500],
            light: blue[200],
            dark: blue[800]
          }
        : {
            light: "#7986cb",
            main: "#3f51b5",
            dark: "#303f9f"
          },
      type: lightMode ? "light" : "dark"
    }
  })

  const handleTheme = () => setLightMode(!lightMode)

  return (
    <themeContext.Provider value={{ theme, handleTheme }}>
      {props.children}
    </themeContext.Provider>
  )
}

export default ThemeContextProvider
