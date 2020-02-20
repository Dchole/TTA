import React from "react"

const AddTask = ({ setDisplay }) => {
  return (
    <button id="add-button" onClick={_ => setDisplay(true)}>
      +
    </button>
  )
}

export default AddTask
