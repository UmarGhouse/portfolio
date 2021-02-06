import React from "react"

import { Container, Grid, Icon, Typography } from '@material-ui/core'

import { LinkButton } from '../Blocks'

import heroImage from '../../../assets/images/hero-image.svg'

export default () => (
	<Container className='home'>
		<section style={{ minHeight: "100vh" }}>
			<Grid container direction="row" spacing={4} justify="space-between" alignItems="center" className="hero-container">
				<Grid item xs={12} md={8}>
					<Grid container direction='column' spacing={2} justify="flex-start" alignItems="flex-start">
						<Grid item>

						</Grid>

						<Grid item>

						</Grid>
					</Grid>
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

		<section>
			<Grid container direction="column" justify="space-between" alignItems="center" spacing={5}>
				<Grid item>
					<Grid container justify="space-between" alignItems="center" spacing={5}>
						<Grid item xs={12} md={6}>
							<Typography variant="h5" className="project-section-text">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget dui purus. Aliquam erat volutpat.
							</Typography>
						</Grid>

						<Grid item xs={12} md={6}>
							<img src="https://via.placeholder.com/350" />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</section>
	</Container>
);