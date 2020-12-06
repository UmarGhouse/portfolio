import React from 'react'
import { Link } from 'react-router-dom'

class Project extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      project: null
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
      .then(response => { this.setState({ project: response }) })
      .catch((error) => console.log(error))
  }

  addHTMLEntities = (str) => {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
  }

  deleteProject = () => {
    const { match: { params: { id } } } = this.props

    const url = `/api/v1/projects/destroy/${id}`
    const token = document.querySelector('meta[name="csrf-token"]').content

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("Network response was not OK")
      })
      .then(() => this.props.history.push("/projects"))
      .catch(error => console.error(error.message))
  }

  render() {
    const { project } = this.state

    return (
      <div>
        <h1>{project ? project.name : "Loading..."}</h1>

        <button type="button" onClick={this.deleteProject}>Delete Project</button>

        <br/>

        {project && (<Link to={`/project/${project.id}/edit`}>Edit this project</Link>)}
        
        <br/>
        
        <Link to="/projects">Back to all projects</Link>
      </div>
    )
  }
}

export default Project