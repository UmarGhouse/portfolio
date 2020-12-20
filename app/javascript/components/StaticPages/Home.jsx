import React from "react";
import { Link } from "react-router-dom";

import { Container, Grid, Button } from '@material-ui/core'

import heroImage from '../../../assets/images/hero-image.svg'

export default () => (
	<Container className='home'>
		<Grid container direction="row" spacing={4} justify="space-between" alignItems="center">
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
			Umar Ghouse
		</p>

		<Link
			to="/about"
			className='btn'
			role="button"
		>
			<Button className='btn-secondary' variant='outlined'>
				Read more about me
			</Button>
		</Link>

		<Link
			to="/projects"
			role="button"
		>
			<Button className='btn-primary' variant='contained'>
				View my projects
			</Button>
		</Link>
	</Container>
);