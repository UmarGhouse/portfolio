import React, { useState, useEffect } from "react"
import { Link as RouterLink } from 'react-router-dom'

import { Container, Grid, Icon, Typography, Link } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import { LinkButton, Footer } from '../Blocks'
import { SanitizeHTML } from '../Utilities'

import heroImage from '../../../assets/images/hero-image.svg'

export default () => {

	const [latestProjects, setLatestProjects] = useState([])

	useEffect(() => {
		let isMounted = true

		async function getLatestProjects() {
			try {
				const url = "/api/v1/projects/latest"

				const response = await fetch(url)

				if (response.ok) {
					const projectData = await response.json()
					
					if (isMounted) setLatestProjects(projectData)
				} else {
					throw new Error("Network response was not OK")
				}
			} catch (err) {
				this.props.history.push("/")
			}
		}

		getLatestProjects()

		return () => {
			isMounted = false
		}
	}, [])

	return (
		<Container className='home'>
			<section className="section hero-section">
				<Grid container direction="row" spacing={4} justify="space-between" alignItems="center" className="hero-container">
					<Grid item xs={12} md={8}>
						<h1 className='hero-header'>
							Umar Ghouse
						</h1>

						<p className='hero-body'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget dui purus. Aliquam erat volutpat.
						</p>

						<p className='hero-body'>
							Maecenas elementum elit rutrum odio scelerisque consectetur. Mauris at urna accumsan, dapibus nibh eu, tristique lorem. Donec in tellus sit amet sapien vulputate luctus facilisis nec mi.
						</p>
					</Grid>
					<Grid item xs={12} md={4}>
						<img src={heroImage} className='hero-image' />
					</Grid>
				</Grid>

				<p className='background-text'>
					Fullstack* Developer
				</p>

				<LinkButton className='btn-secondary' variant='outlined' href="/about">
					Read more about me
				</LinkButton>

				<LinkButton className='btn-primary' variant='contained' href="/projects">
					View my projects
				</LinkButton>

				<div className="arrow-container">
					<Grid container direction='column' justify="flex-end" alignItems="center">
						<Grid item>
							<p className="arrow-text">
								Scroll for more...
					</p>
						</Grid>
						<Grid item>
							<Icon className="fas fa-chevron-down arrow" fontSize="small" />
						</Grid>
					</Grid>
				</div>
			</section>

			<section className="section">
				<Grid container direction="column" justify="space-between" alignItems="stretch" spacing={5}>
					<Grid item>
						<Link component={RouterLink} to='/projects'>
							<Grid container justify="flex-start" alignItems="center" spacing={3}>
								<Grid item>
									<Typography variant="h2">
										Latest projects

										<Icon>
											<ArrowForwardIosIcon style={{ marginBottom: '0.2em' }} />
										</Icon>
									</Typography>
								</Grid>
							</Grid>
						</Link>
					</Grid>
					<Grid item>
						{latestProjects.length > 0 && latestProjects.map((project, index) => (
							<Grid container key={project.id} justify="space-between" alignItems="center" spacing={5} direction={index % 2 === 0 ? "row" : "row-reverse"}>
								<Grid item xs={12} md={6}>
									<Typography variant="h3">
										{project.name}
									</Typography>

									<Typography variant="h5" className="project-section-text" component='div'>
										<SanitizeHTML html={_.replace(project.description.substring(0, 200), /\\n/g, " ") + "..."} />
									</Typography>

									<LinkButton className='btn-secondary' variant='outlined' href={`/project/${project.id}`}>
										Check it out
									</LinkButton>
								</Grid>

								<Grid item xs={12} md={6}>
									<img className="homepage-project-image" src={project.featured_screenshot ? project.featured_screenshot.url : "https://via.placeholder.com/350"} />
								</Grid>
							</Grid>
						))}
					</Grid>
				</Grid>
			</section>

			<section className="section">
				<Footer />
			</section>
		</Container>
	)
};