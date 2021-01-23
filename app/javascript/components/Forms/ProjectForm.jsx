import React from 'react'

import { Button, TextField, Paper, FormGroup, FormControl, Checkbox, FormLabel, FormControlLabel, Grid, Snackbar, IconButton } from '@material-ui/core'

import { DropzoneArea } from 'material-ui-dropzone'
import { DirectUpload } from '@rails/activestorage'

import ScreenshotItem from './ScreenshotItem'

import { CustomSnackbar } from '../Blocks'

class ProjectForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "", // String - name of the project
      description: "", // Rich Text Description of the project
      repo_url: "", // Link to Github repo
      status: "private", // Notes whether Github repo is private/public
      screenshots: [], // Array of screenshots to be uploaded to ActiveStorage
      blob_ids: [],
      screenshotsToDisplay: [], // Array of screenshots already attached to the project to be displayed
      openSnackbar: false
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
          status: currentValues.status,
          screenshotsToDisplay: currentValues.screenshots
        })
      } else {
        this.setState({
          name: "",
          description: "",
          repo_url: "",
          status: 0,
          screenshotsToDisplay: [],
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
        console.log("UPLOAD ERROR", error)
      } else {
        this.setState(prevState => ({ blob_ids: [...prevState.blob_ids, blob], openSnackbar: true }))
      }
    })
  }

  handlefieUpload = (files) => {
    this.setState(prevState => ({ screenshots: [...prevState.screenshots, ...files] }))
  }

  handleSnackbarClose = () => {
    this.setState({ openSnackbar: false })
  }

  render() {
    const { handleSubmit, submitButtonText } = this.props
    const { name, description, repo_url, status, screenshotsToDisplay, openSnackbar } = this.state

    return (
      <Paper style={{ backgroundColor: "#fcfcfc", padding: "2em" }}>
        <form onSubmit={(event) => { handleSubmit(event, this.state) }}>
          <Grid container spacing={5} justify="space-between">
            <Grid item xs={12}>
              <DropzoneArea
                acceptedFiles={['image/*']}
                dropzoneText={"Drag and drop an image here or click"}
                onChange={(files) => { this.handlefieUpload(files) }}
                onDrop={(files) => { this.onDrop(files) }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
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
                fullWidth
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
                fullWidth
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
            </Grid>

            <Grid item xs={6}>
              <Grid container spacing={3} justify="space-between">
                {screenshotsToDisplay.length > 0 && screenshotsToDisplay.map((screenshot, index) => (
                  <ScreenshotItem screenshot={screenshot} key={index} />
                ))}
              </Grid>
            </Grid>
          </Grid>

          <Button style={{ display: "block", margin: "5px" }} className="btn-primary" type="submit">{submitButtonText}</Button>
        </form>

        <CustomSnackbar
          open={openSnackbar}
          handleClose={this.handleSnackbarClose}
          message="Image successfully uploaded to GCS"
        />
      </Paper>
    )
  }
}

export default ProjectForm