import React from 'react'
import { Link } from 'react-router-dom'

import ImageGallery from 'react-image-gallery'
import { Container, Typography, Button, Tooltip, Grid } from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star'

import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

import { LinkButton, Footer } from '../Blocks'
import { SanitizeHTML } from '../Utilities'

class Project extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      project: null,
      images: null
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
      .then(response => {
        const images = []

        if (response.screenshots.length > 0) {
          response.screenshots.map(screenshot => (
            images.push({
              original: screenshot.url,
              originalAlt: screenshot.filename,
              originalTitle: screenshot.filename,
              thumbnail: screenshot.url,
              thumbnailAlt: screenshot.filename,
              thumbnailTitle: screenshot.filename,
            })
          ))
        }

        this.setState({ 
          project: response,
          images: images.length > 0 ? images : null
        }) 
      })
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
    const { project, images } = this.state

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

        <Grid container justify="space-between" alignItems="flex-start" spacing={5}>
          <Grid item xs={12} md={6}>
            <Typography>
              {project ? (
                <SanitizeHTML html={project.description} />
              ) : "Loading..."}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            {images && (
              <ImageGallery items={images} thumbnailPosition="right" showPlayButton={false} showNav={false} height={750} />
            )}
          </Grid>
        </Grid>

        {project && (<LinkButton variant="outlined" className="btn-primary" href={`/project/${project.id}/edit`}>Edit this project</LinkButton>)}

        <br />

        <Button variant="outlined" className="btn-secondary" onClick={this.deleteProject}>Delete Project</Button>

        <br />

        <LinkButton variant="outlined" className="btn-secondary" href="/projects">Back to all projects</LinkButton>

        <section className="section">
          <Footer />
        </section>
      </Container>
    )
  }
}

export default Project