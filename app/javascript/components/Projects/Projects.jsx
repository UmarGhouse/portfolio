import React, { Component } from "react";
import { Link } from "react-router-dom";

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
			.then(response => this.setState({ projects: response }, () => { console.log(this.state.projects[0]) }))
			.catch(() => this.props.history.push("/"))
	}

	render() {
		const { projects } = this.state

		const allProjects = projects.map((project, index) => (
			<div key={index}>
				<h5>{project.name}</h5>
				<p>{project.description}</p>
				<p>{project.status}</p>
				<Link to={`/project/${project.id}`}>
					View Project
				</Link>
			</div>
		))

		const noProject = (
			<div>
				<h4>
					No projects yet. Why not <Link to="/new_project">create one</Link>.
				</h4>
			</div>
		)

		return (
			<>
				{projects.length > 0 ? allProjects : noProject}
			</>
		)
	}
}

export default Projects