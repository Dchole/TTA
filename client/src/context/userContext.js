import React, { createContext, useEffect } from "react"

export const userContext = createContext()

const UserContextProvider = props => {
  useEffect(() => {}, [])

  return <userContext.Provider>{props.children}</userContext.Provider>
}

export default UserContextProvider
