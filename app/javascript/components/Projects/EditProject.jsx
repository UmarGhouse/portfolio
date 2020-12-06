import React from "react"
import { Link } from 'react-router-dom'

import ProjectForm from '../Forms/ProjectForm'

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
    const { name, description, repo_url, status } = formData

    if (name.length == 0 | description.length == 0) return

    const body = {
      name,
      description: description.replace(/\n/g, "<br> <br>"),
      repo_url,
      status
    }

    const token = document.querySelector('meta[name="csrf-token"]').content
    fetch(url, {
      method: 'PUT',
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
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
    const { projectData } = this.state
    
    return (
      <div>
        <h1>{projectData ? `Edit ${projectData.name}` : "loading..."}</h1>

        <ProjectForm
          handleSubmit={this.onSubmit}
          handleChange={this.onChange}
          currentValues={projectData}
          submitButtonText="Save Changes"
        />
        
        <Link to="/projects">Back to all Projects</Link>
      </div>
    )
  }
}

export default EditProject