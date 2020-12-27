import React from 'react'

import { Button, TextField, Paper, FormGroup, FormControl, Checkbox, FormLabel, FormControlLabel } from '@material-ui/core'

class ProjectForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      description: "",
      repo_url: "",
      status: "private"
    }
  }

  componentDidUpdate(prevProps) {

    const { currentValues } = this.props

    if (prevProps.currentValues !== currentValues) {
      if (currentValues) {
        this.setState({
          name: currentValues.name,
          description: currentValues.description,
          repo_url: currentValues.repo_url,
          status: currentValues.status
        })
      } else {
        this.setState({
          name: "",
          description: "",
          repo_url: "",
          status: 0
        })
      }
    }
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleCheckboxChange = (event) => {
    const { target: { checked, name } } = event

    this.setState({
      status: checked ? name : null
    })
  }

  render() {
    const {handleSubmit, submitButtonText} = this.props
    const { name, description, repo_url, status } = this.state

    return (
      <Paper style={{ backgroundColor: "#2c3a41", padding: "10px" }} elevation={0}>
        <form onSubmit={(event) => { handleSubmit(event, this.state) }}>
          <TextField 
            variant="outlined" 
            style={{ margin: "10px", display: "block" }}
            label="Project Name" 
            name="name" 
            value={name} 
            id="projectName" 
            required 
            onChange={this.onChange} 
          />

          <TextField 
            variant="outlined" 
            style={{ margin: "10px", display: "block" }}
            label="Project Description" 
            name="description" 
            value={description} 
            id="projectDescription" 
            multiline
            required
            onChange={this.onChange} 
          />

          <TextField 
            variant="outlined" 
            style={{ margin: "10px", display: "block" }}
            label="Project Repo URL" 
            name="repo_url" 
            value={repo_url} 
            id="projectRepo" 
            required 
            onChange={this.onChange} 
          />

          <FormControl component="fieldset">
            <FormLabel component="legend">Repo Status</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={status === "private"} onChange={this.handleCheckboxChange} name="private" />}
                label="Private"
              />

              <FormControlLabel
                control={<Checkbox checked={status === "public"} onChange={this.handleCheckboxChange} name="public" />}
                label="Public"
              />
            </FormGroup>
          </FormControl>

          <Button style={{ display: "block", margin: "5px" }} className="btn-primary" type="submit">{submitButtonText}</Button>
        </form>
      </Paper>
    )
  }
}

export default ProjectForm