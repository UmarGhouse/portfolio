import React from 'react'
import { Link } from 'react-router-dom'

import { Container, Typography, Button, Tooltip, GridList, GridListTile } from '@material-ui/core'

import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

import { LinkButton } from '../Blocks'

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
    
    const showRepoButton = (
      <>
        {project && project.status === "public" ? 
          (<Tooltip title={project && project.repo_url}><a href={project ? project.repo_url : "#"} target="_blank"><OpenInNewIcon /></a></Tooltip>) 
          : (
            <Tooltip title="Private repo">
              <VisibilityOffIcon />
            </Tooltip>
          )}
      </>
    )
    
    return (
      <Container>
        <h1>
          {project ? project.name : "Loading..."} {showRepoButton}
        </h1>

        {project && project.screenshots.length > 0 && (
          <GridList cellHeight={160} cols={3}>
            {project.screenshots.map((screenshot, index) => (
              <GridListTile key={index} cols={1}>
                <img src={screenshot.url} alt={`screenshot-${index}`} />
              </GridListTile>
            ))}
          </GridList>
        )}

        <Typography>
          {project ? project.description : "Loading..."}
        </Typography>

        {project && (<LinkButton variant="outlined" className="btn-primary" href={`/project/${project.id}/edit`}>Edit this project</LinkButton>)}

        <br/>

        <Button variant="outlined" className="btn-secondary" onClick={this.deleteProject}>Delete Project</Button>
        
        <br/>
        
        <LinkButton variant="outlined" className="btn-secondary" href="/projects">Back to all projects</LinkButton>
      </Container>
    )
  }
}

export default Project