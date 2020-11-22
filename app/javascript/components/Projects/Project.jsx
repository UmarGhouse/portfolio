import React from 'react'
import { Link } from 'react-router-dom'

class Project extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      project: null
    }

    this.addHTMLEntities = this.addHTMLEntities.bind(this)
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
      .then(response => { console.log(response); this.setState({ project: response }) })
      .catch((error) => console.log(error))
  }

  addHTMLEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
  }

  render() {
    const { project } = this.state

    return (
      <div>
        <h1>{project ? project.name : "Loading..."}</h1>
      </div>
    )
  }
}

export default Project