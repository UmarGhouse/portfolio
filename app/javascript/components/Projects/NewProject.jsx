import React from "react"

import ProjectForm from '../Forms/ProjectForm'

class NewProject extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      description: "",
      repo_url: "",
      status: 0
    }
  }

  stripHtmlEntities = (str) => {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const url = "/api/v1/projects/create"
    const { name, description, repo_url, status } = this.state

    if (name.length == 0 | description.length == 0) return

    const body = {
      name,
      description: description.replace(/\n/g, "<br> <br>"),
      repo_url,
      status
    }

    const token = document.querySelector('meta[name="csrf-token"]').content
    fetch(url, {
      method: 'POST',
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
    return (
      <div>
        <h1>Add a new project</h1>

        <ProjectForm
          handleSubmit={this.onSubmit}
          handleChange={this.onChange}
        />
      </div>
    )
  }
}

export default NewProject