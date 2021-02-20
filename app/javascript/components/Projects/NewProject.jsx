import React from "react"
import { Link } from 'react-router-dom'

import { Container } from '@material-ui/core'

import ProjectForm from '../Forms/ProjectForm'
import { LinkButton } from '../Blocks'

class NewProject extends React.Component {
  constructor(props) {
    super(props)
  }

  stripHtmlEntities = (str) => {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
  }

  onSubmit = (event, formData) => {
    event.preventDefault()
    const url = "/api/v1/projects/create"
    const { name, description, repo_url, status, blob_ids, skills, url: prodUrl } = formData

    if (name.length == 0 | description.length == 0) return

    const formattedBlobIds = []
    blob_ids.map(blob => (formattedBlobIds.push({ signed_blob_id: blob.signed_id })))

    const body = {
      name,
      description,
      repo_url,
      url: prodUrl,
      status,
      screenshots: formattedBlobIds,
      skills
    }

    const token = document.querySelector('meta[name="csrf-token"]').content
    fetch(url, {
      method: 'POST',
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
      .then(response => this.props.history.push(`/project/${response.id}`))
      .catch(error => console.error(error.message))
  }

  render() {
    return (
      <Container>
        <h1>Add a new project</h1>

        <ProjectForm
          handleSubmit={this.onSubmit}
          submitButtonText="Create project"
        />
        
        <LinkButton className="btn-secondary" variant="outlined" href="/projects">Back to all Projects</LinkButton>
      </Container>
    )
  }
}

export default NewProject