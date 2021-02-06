import React, { Component } from "react";
import _ from 'lodash'

import { Container, Grid, Tooltip, Card, CardContent, CardActions, CardMedia } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

import { LinkButton } from '../Blocks'

class Projects extends Component {
	constructor(props) {
		super(props)
		this.state = {
			projects: []
		}
	}

	componentDidMount() {
		const url = "/api/v1/projects/index"

		fetch(url)
			.then(response => {
				if (response.ok) {
					return response.json()
				}

				throw new Error("Network response was not OK")
			})
			.then(response => this.setState({ projects: response }))
			.catch(() => this.props.history.push("/"))
	}

	render() {
		const { projects } = this.state

		const allProjects = projects.map((project, index) => (
			<Grid item xs={11} md={3} key={index} className="project-grid-item">
				<Card>
					<CardMedia
						image={project.featured_screenshot ? project.featured_screenshot.url : 'https://via.placeholder.com/150'}
						title={project.featured_screenshot ? project.featured_screenshot.filename : 'No image yet. Upload something!'}
						style={{ height: '150px' }}
					/>
					<CardContent>
						<h2>{project.name}</h2>
						<p>{project.description}</p>
				
						<p>
							{project.status === "private" ? (
								<Tooltip title="Private repo">
									<VisibilityOffIcon />
								</Tooltip>
							) : (
								<Tooltip title="Public repo">
									<VisibilityIcon />
								</Tooltip>
							)}
						</p>
					</CardContent>

					<CardActions>
						<LinkButton size="small" variant='text' href={`/project/${project.id}`}>
							View Project
						</LinkButton>
					</CardActions>
				</Card>
			</Grid>
		))

		const noProject = _.times(8, (i) => (
			<Grid item xs={11} md={3} key={i} className="project-grid-item">
				<Skeleton variant="rect" width={300} height={300} />
			</Grid>
		))

		return (
			<Container>
				<LinkButton className='btn-primary' variant='contained' href="/project">
					Create new Project
				</LinkButton>

				<Grid container spacing={2} direction="row" justify="space-evenly" alignItems="flex-start">
					{projects.length > 0 ? allProjects : noProject}
				</Grid>
			</Container>
		)
	}
}

export default Projects