import React from 'react'
import _ from 'lodash'

import { Editor } from '@tinymce/tinymce-react'
import { 
  Button, 
  TextField, 
  Paper, 
  FormGroup, 
  FormControl, 
  Checkbox, 
  FormLabel, 
  FormControlLabel, 
  Grid, 
  LinearProgress, 
  Typography, 
  Chip 
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Alert from '@material-ui/lab/Alert'

import { DropzoneArea } from 'material-ui-dropzone'
import { DirectUpload } from '@rails/activestorage'

import SkillForm from './SkillForm'
import ScreenshotItem from './ScreenshotItem'

import settings from '../../settings/settings'

import { CustomSnackbar, ConfirmationDialog, FormDialog } from '../Blocks'

class ProjectForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "", // String - name of the project
      description: "", // Rich Text Description of the project
      repo_url: "", // Link to Github repo
      url: "", // Link to hosted project
      status: "private", // Notes whether Github repo is private/public 
      blob_ids: [], // Array of screenshot blob_ids after uploading to ActiveStorage
      screenshotsToDisplay: [], // Array of screenshots already attached to the project to be displayed
      openSnackbar: false,
      snackbarMessage: '',
      uploading: false,
      openDialog: false,
      selectedScreenshot: null,
      deleting: false,
      loading: false,
      allSkills: [], // Array of all available skills
      skills: [], // Array of selected skills
      openSkillDialog: false, // Boolean to open the skill form dialog
    }
  }

  componentDidMount() {
    this.getSkills()
  }

  componentDidUpdate(prevProps) {
    const { currentValues } = this.props

    if (prevProps.currentValues !== currentValues) {
      if (currentValues) {
        this.setState({
          name: currentValues.name,
          description: currentValues.description,
          repo_url: currentValues.repo_url,
          url: currentValues.url,
          status: currentValues.status,
          screenshotsToDisplay: currentValues.screenshots,
          skills: currentValues.skills
        })
      } else {
        this.setState({
          name: "",
          description: "",
          repo_url: "",
          url: "",
          status: 0,
          screenshotsToDisplay: [],
          skills: []
        })
      }
    }
  }

  getSkills = () => {
    const url = `/api/v1/skills/index`

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        throw new Error("Network reponse was not OK")
      })
      .then(response => { 
        const skillsList = []
        response.map(skill => skillsList.push({ name: skill.name, value: skill.id, colour: skill.colour, startDate: skill.start_date }))

        this.setState({ allSkills: skillsList })
      })
      .catch((error) => console.log(error))
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSkillsChange = (selectedItems) => {
    this.setState({ skills: selectedItems })
  }

  handleEditorChange = (content, editor) => {
    this.setState({ description: content })
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

  handleSkillDialogOpen = () => {
    this.setState({ openSkillDialog: true })
  }

  handleSkillDialogClose = () => {
    this.setState({ openSkillDialog: false })
  }

  onDrop = (files) => {
    files.forEach(file => this.uploadFile(file))
  }

  uploadFile = (file) => {
    this.setState({ uploading: true })

    const url = `${settings.baseURL}/rails/active_storage/direct_uploads`

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

  handleSkillFormSubmit = () => {
    this.getSkills()
    this.handleSkillDialogClose()
  }

  render() {
    const { handleSubmit, submitButtonText } = this.props
    const { 
      name,
      description,
      repo_url,
      url,
      status,
      screenshotsToDisplay,
      openSnackbar,
      snackbarMessage,
      uploading,
      openDialog,
      deleting,
      selectedScreenshot,
      loading,
      allSkills,
      skills,
      openSkillDialog
    } = this.state

    return (
      <Paper style={{ backgroundColor: "#fcfcfc", padding: "2em", margin: '1em auto' }} elevation={3}>
        <form onSubmit={(event) => { handleSubmit(event, this.state) }}>
          <Grid container spacing={5} justify="space-between">
            <Grid item xs={12}>
              <DropzoneArea
                acceptedFiles={['image/*']}
                dropzoneText={"Drag and drop a new image here or click to upload"}
                onDrop={(files) => { this.onDrop(files) }}
              />

              {uploading && (<LinearProgress />)}
            </Grid>

            <Grid item xs={6}>
              <Grid container direction="column" spacing={5} justify="space-between" alignItems="stretch">
                <Grid item xs={12}>
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
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    style={{ margin: "10px", display: "block" }}
                    label="Production URL"
                    name="url"
                    value={url}
                    id="projectUrl"
                    required
                    onChange={this.onChange}
                  />
                </Grid>

                <Grid item>
                  <Editor
                    apiKey="p29c5vz64uvqsuf3g2uzwnk0bmscnfmjwu88u9qgyjxnri6i"
                    initialValue=""
                    name="description"
                    value={description}
                    id="projectDescription"
                    required
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                      ],
                      toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help'
                    }}
                    onEditorChange={this.handleEditorChange}
                  />
                </Grid>

                <Grid item xs={12}>
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
                </Grid>

                <Grid item>
                  <Button onClick={this.handleSkillDialogOpen}>Add Skill</Button>
                  <Autocomplete
                    id="skills-select"
                    fullWidth
                    options={allSkills}
                    getOptionSelected={(option, selectedValue) => option.name === selectedValue.name}
                    getOptionLabel={(option) => option.name}
                    multiple
                    value={skills}
                    onChange={(e, selectedItems) => { this.handleSkillsChange(selectedItems) }}
                    renderInput={(params) => <TextField {...params} label="Skills" variant="outlined" />}
                    renderTags={(tagValue, getTagProps) =>
                      tagValue.map((option, index) => (
                        <Chip
                          label={option.name}
                          {...getTagProps({ index })}
                          style={{ backgroundColor: option.colour }}
                        />
                      ))
                    }
                  />
                </Grid>

                <Grid item>
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
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid container spacing={3} justify="space-between">
                {screenshotsToDisplay.length > 0 ? _.sortBy(screenshotsToDisplay, ['filename']).map((screenshot, index) => (
                  <ScreenshotItem 
                    screenshot={screenshot} 
                    key={index} 
                    handleDelete={this.handleDialogOpen} 
                    handleFeatured={this.handleFeaturedImage} 
                    loading={loading}
                    selectedScreenshot={selectedScreenshot} 
                  />
                )) 
                : (
                  <Alert severity="info">
                    <Typography>
                      Once an image is uploaded, it will appear here.

                      <br />

                      Uploaded images can be marked as featured etc. after they appear here.
                    </Typography>
                  </Alert>
                )}
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

        <FormDialog
          open={openSkillDialog}
          handleClose={this.handleSkillDialogClose}
          title='Add a new skill'
          content="Fill out the details below to add a new skill"
        >
          <SkillForm handleSubmit={this.handleSkillFormSubmit} allSkills={allSkills} />
        </FormDialog>
      </Paper>
    )
  }
}

export default ProjectForm