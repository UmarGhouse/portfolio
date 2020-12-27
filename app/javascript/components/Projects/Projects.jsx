import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Container, Grid, Tooltip, Card, CardContent, CardActions } from '@material-ui/core'

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
				<Card style={{ backgroundColor: "#2c3a41" }}>
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
						<LinkButton className='btn-secondary' variant='outlined' href={`/project/${project.id}`}>
							View Project
						</LinkButton>
					</CardActions>
				</Card>
			</Grid>
		))

		const noProject = (
			<Grid item xs={12}>
				<h2>
					No projects yet.
				</h2>

				<p>Why not <Link to="/new_project">create one</Link>.</p>
			</Grid>
		)

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