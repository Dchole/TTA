import React from "react"
import Grid from "@material-ui/core/Grid"
import DateFnsUtils from "@date-io/date-fns"
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers"

const PickDateAndTime = ({ date, handleDateTimeChange }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <DateTimePicker
          variant="inline"
          value={date}
          onChange={handleDateTimeChange}
          onError={console.log}
          disablePast
          placeholder="Date and Time of activity"
          format="dd/mm/yyyy HH:mm"
        />
      </Grid>
    </MuiPickersUtilsProvider>
  )
}

export default PickDateAndTime
