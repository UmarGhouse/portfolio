import React from 'react'

import { Button, TextField, Paper, FormGroup, FormControl, Checkbox, FormLabel, FormControlLabel } from '@material-ui/core'

import { DropzoneArea } from 'material-ui-dropzone'
import { DirectUpload } from '@rails/activestorage'

class ProjectForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "", // String - name of the project
      description: "", // Rich Text Description of the project
      repo_url: "", // Link to Github repo
      status: "private", // Notes whether Github repo is private/public
      screenshots: [], // Array of screenshots to be uploaded to ActiveStorage
      blob_ids: []
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

  onDrop = (files) => {
    files.forEach(file => this.uploadFile(file))
  }

  uploadFile = (file) => {
    const url = "http://localhost:3000/rails/active_storage/direct_uploads"

    const upload = new DirectUpload(file, url)

    upload.create((error, blob) => {
      if (error) {
        console.log("UPLOAD ERROR" ,error)
      } else {
        this.setState(prevState => ({ blob_ids: [...prevState.blob_ids, blob] }), () => { console.log("POST UPLOAD: ", this.state.blob_ids) })
      }
    })
  }
  
  handlefieUpload = (files) => {
    this.setState(prevState => ({ screenshots: [...prevState.screenshots, ...files] }))
  }

  render() {
    const {handleSubmit, submitButtonText} = this.props
    const { name, description, repo_url, status } = this.state

    return (
      <Paper style={{ backgroundColor: "#2c3a41", padding: "10px" }} elevation={0}>
        <form onSubmit={(event) => { handleSubmit(event, this.state) }}>

          <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneText={"Drag and drop an image here or click"}
            onChange={(files) => { this.handlefieUpload(files) }}
            onDrop={(files) => {this.onDrop(files)}}
          />

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