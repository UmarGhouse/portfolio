import React from "react"

import { Container } from '@material-ui/core'

import ProjectForm from '../Forms/ProjectForm'
import { LinkButton } from '../Blocks'

class EditProject extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      projectData: null
    }
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props

    const url = `/api/v1/projects/show/${id}`

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        throw new Error("Network reponse was not OK")
      })
      .then(response => { this.setState({ projectData: response }) })
      .catch((error) => console.log(error))
  }

  stripHtmlEntities = (str) => {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
  }

  onSubmit = (event, formData) => {
    const { match: { params: { id } } } = this.props

    event.preventDefault()
    const url = `/api/v1/projects/update/${id}`
    const { name, description, repo_url, status, blob_ids, skills } = formData

    if (name.length == 0 | description.length == 0) return

    const formattedBlobIds = []
    blob_ids.map(blob => (formattedBlobIds.push({ signed_blob_id: blob.signed_id })))

    const body = {
      name,
      description,
      repo_url,
      status,
      screenshots: formattedBlobIds,
      skills
    }

    const token = document.querySelector('meta[name="csrf-token"]').content
    fetch(url, {
      method: 'PUT',
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ project: body})
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("Network response was not OK.")
      })
      .then(response => {
        this.props.history.push(`/project/${response.id}`)
      })
      .catch(error => console.error(error.message))
  }

  render() {
    const { projectData } = this.state
    const { match: { params: { id } } } = this.props
    
    return (
      <Container>
        <h1>{projectData ? `Edit ${projectData.name}` : "loading..."}</h1>

        <ProjectForm
          handleSubmit={this.onSubmit}
          handleChange={this.onChange}
          projectId={id}
          currentValues={projectData}
          submitButtonText="Save Changes"
        />
        
        <LinkButton className="btn-secondary" variant="outlined" href="/projects">Back to all Projects</LinkButton>
      </Container>
    )
  }
}

export default EditProject