import React, { Component } from "react";
import { Link as RouterLink } from 'react-router-dom'
import _ from 'lodash'

import { Container, Grid, Tooltip, Card, CardContent, Chip, CardMedia, Typography, Link } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

import { LinkButton, Footer } from '../Blocks'
import { SanitizeHTML } from '../Utilities'

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
			<Grid item xs={12} md={4} key={index} className="project-grid-item">
				<Link component={RouterLink} to={`/project/${project.id}`}>
					<Card className="project-card">
						<CardMedia
							image={project.featured_screenshot ? project.featured_screenshot.url : 'https://via.placeholder.com/150'}
							title={project.featured_screenshot ? project.featured_screenshot.filename : 'No image yet. Upload something!'}
							style={{ height: '150px' }}
						/>
						<CardContent>
							<h2>
								{project.name}
							</h2>
							{project.status === "private" ? (
								<Tooltip title="Private repo">
									<VisibilityOffIcon />
								</Tooltip>
							) : (
									<Tooltip title="Public repo">
										<VisibilityIcon />
									</Tooltip>
								)}

							<Typography component="div">
								<SanitizeHTML html={_.replace(project.description.substring(0, 150), /\\n/g, " ") + "..."} />
							</Typography>

							{project.skills && project.skills.map(skill => (
								<Chip size="small" label={skill.name} key={skill.id} className="skill-chip" style={{ backgroundColor: skill.colour }} />
							))}
						</CardContent>
					</Card>
				</Link>
			</Grid>
		))

		const noProject = _.times(8, (i) => (
			<Grid item xs={12} md={4} key={i} className="project-grid-item">
				<Skeleton variant="rect" width={400} height={430} />
			</Grid>
		))

		return (
			<Container>
				<LinkButton className='btn-primary' variant='contained' href="/project">
					Create new Project
				</LinkButton>

				<section className="section">
					<Grid container spacing={2} direction="row" justify="space-evenly" alignItems="flex-start">
						{projects.length > 0 ? allProjects : noProject}
					</Grid>
				</section>

				<section className="section">
					<Footer />
				</section>
			</Container>
		)
	}
}

export default Projects