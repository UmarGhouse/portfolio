import React from 'react'
import { SketchPicker } from 'react-color'

import { Button, Grid, TextField } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'

import MomentUtils from '@date-io/moment'

const SkillForm = ({ handleSubmit }) => {
  const [state, setState] = React.useState({
    name: '',
    startDate: new Date(),
    colour: '#ececec'
  })

  const submitForm = (event, formData) => {
    event.preventDefault()
    const url = "/api/v1/skills/create"
    const { name, startDate, colour } = formData

    if (name.length == 0) return

    const body = {
      name,
      start_date: startDate,
      colour
    }

    const token = document.querySelector('meta[name="csrf-token"]').content
    fetch(url, {
      method: 'POST',
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ skill: body})
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("Network response was not OK.")
      })
      .then(response => handleSubmit(response))
      .catch(error => console.error(error.message))
  }

  return (
    <form onSubmit={(event) => {
      event.preventDefault()
      submitForm(event, state)
    }}>
      <Grid container spacing={5} justify="space-between">
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            style={{ margin: "10px", display: "block" }}
            label="Skill Name"
            name="name"
            value={state.name}
            id="skillName"
            required
            onChange={({ target: { value } }) => { setState({ ...state, name: value }) }}
          />
        </Grid>

        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              disableFuture
              fullWidth
              label="Start Date"
              value={state.startDate}
              onChange={dateObject => { setState({ ...state, startDate: dateObject ? dateObject._d : '' }) }}
              format="DD-MM-YYYY"
            />
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid item xs={12}>
          <SketchPicker
            color={state.colour}
            onChangeComplete={colour => { setState({ ...state, colour: colour.hex}) }}
          />
        </Grid>
      </Grid>

      <Button style={{ display: "block", margin: "15px 5px" }} className="btn-primary" type="submit">Add Skill</Button>
    </form>
  )
}

export default SkillForm
