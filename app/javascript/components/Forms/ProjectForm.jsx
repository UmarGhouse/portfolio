import React from 'react'
import _ from 'lodash'

import { Button, TextField, Paper, FormGroup, FormControl, Checkbox, FormLabel, FormControlLabel, Grid, LinearProgress } from '@material-ui/core'

import { DropzoneArea } from 'material-ui-dropzone'
import { DirectUpload } from '@rails/activestorage'

import ScreenshotItem from './ScreenshotItem'

import { CustomSnackbar, ConfirmationDialog } from '../Blocks'

class ProjectForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "", // String - name of the project
      description: "", // Rich Text Description of the project
      repo_url: "", // Link to Github repo
      status: "private", // Notes whether Github repo is private/public 
      blob_ids: [], // Array of screenshot blob_ids after uploading to ActiveStorage
      screenshotsToDisplay: [], // Array of screenshots already attached to the project to be displayed
      openSnackbar: false,
      snackbarMessage: '',
      uploading: false,
      openDialog: false,
      selectedScreenshot: null,
      deleting: false,
      loading: false
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

  handleDialogOpen = (selectedScreenshot) => {
    this.setState({ openDialog: true, selectedScreenshot })
  }

  handleDialogClose = () => {
    this.setState({ openDialog: false, selectedScreenshot: null })
  }

  onDrop = (files) => {
    files.forEach(file => this.uploadFile(file))
  }

  uploadFile = (file) => {
    this.setState({ uploading: true })

    const url = "http://localhost:3000/rails/active_storage/direct_uploads"

    const upload = new DirectUpload(file, url)

    upload.create((error, blob) => {
      if (error) {
        console.log("UPLOAD ERROR", error)
      } else {
        this.setState(prevState => ({ blob_ids: [...prevState.blob_ids, blob], openSnackbar: true, snackbarMessage: "Image successfully uploaded to GCS", uploading: false }))
      }
    })
  }

  handleSnackbarClose = () => {
    this.setState({ openSnackbar: false, snackbarMessage: '' })
  }

  handleFeaturedImage = (screenshot) => {
    const { projectId } = this.props

    this.setState({ loading: true, selectedScreenshot: screenshot })

    const url = `/api/v1/projects/${projectId}/screenshots/make_featured/${screenshot.id}`

    const token = document.querySelector('meta[name="csrf-token"]').content

    fetch(url, {
      method: 'PUT',
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("Network response was not OK.")
      })
      .then(response => {
        this.setState({ loading: false, selectedScreenshot: null })

        const screenshotUrl = `/api/v1/projects/${projectId}/screenshots`

        fetch(screenshotUrl)
          .then(response => {
            if (response.ok) {
              return response.json()
            }

            throw new Error("Network reponse was not OK")
          })
          .then(response => { this.setState({ screenshotsToDisplay: response, openSnackbar: true, snackbarMessage: `${screenshot.filename} set as featured image` }) })
          .catch((error) => console.log(error))
      })
      .catch(error => console.error(error.message))
  }

  handleDeleteFile = () => {
    const { projectId } = this.props
    const { selectedScreenshot } = this.state

    this.setState({ deleting: true })

    const url = `/api/v1/projects/screenshots/destroy/${selectedScreenshot.id}`

    const token = document.querySelector('meta[name="csrf-token"]').content

    fetch(url, {
      method: 'DELETE',
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("Network response was not OK.")
      })
      .then(response => {
        this.setState({ deleting: false })
        this.handleDialogClose()

        const screenshotUrl = `/api/v1/projects/${projectId}/screenshots`

        fetch(screenshotUrl)
          .then(response => {
            if (response.ok) {
              return response.json()
            }

            throw new Error("Network reponse was not OK")
          })
          .then(response => { this.setState({ screenshotsToDisplay: response }) })
          .catch((error) => console.log(error))
      })
      .catch(error => console.error(error.message))
  }

  render() {
    const { handleSubmit, submitButtonText } = this.props
    const { name, description, repo_url, status, screenshotsToDisplay, openSnackbar, snackbarMessage, uploading, openDialog, deleting, selectedScreenshot, loading } = this.state

    return (
      <Paper style={{ backgroundColor: "#fcfcfc", padding: "2em" }}>
        <form onSubmit={(event) => { handleSubmit(event, this.state) }}>
          <Grid container spacing={5} justify="space-between">
            <Grid item xs={12}>
              <DropzoneArea
                acceptedFiles={['image/*']}
                dropzoneText={"Drag and drop an image here or click"}
                onDrop={(files) => { this.onDrop(files) }}
              />

              {uploading && (<LinearProgress />)}
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
                {screenshotsToDisplay.length > 0 && _.sortBy(screenshotsToDisplay, ['filename']).map((screenshot, index) => (
                  <ScreenshotItem 
                    screenshot={screenshot} 
                    key={index} 
                    handleDelete={this.handleDialogOpen} 
                    handleFeatured={this.handleFeaturedImage} 
                    loading={loading}
                    selectedScreenshot={selectedScreenshot} 
                  />
                ))}
              </Grid>
            </Grid>
          </Grid>

          <Button style={{ display: "block", margin: "5px" }} className="btn-primary" type="submit">{submitButtonText}</Button>
        </form>

        <CustomSnackbar
          open={openSnackbar}
          handleClose={this.handleSnackbarClose}
          message={snackbarMessage}
        />

        <ConfirmationDialog
          open={openDialog}
          handleClose={this.handleDialogClose}
          title='Are you sure you want to delete this screenshot?'
          content={<>This will <strong>permanently</strong> delete the "{selectedScreenshot && selectedScreenshot.filename}" screenshot. Are you sure?</>}
          handleSubmit={this.handleDeleteFile}
          showProgress
          isSubmitting={deleting}
        />
      </Paper>
    )
  }
}

export default ProjectForm