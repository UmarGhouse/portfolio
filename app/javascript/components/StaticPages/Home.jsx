import React from "react";

import { Container, Grid } from '@material-ui/core'

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import { LinkButton } from '../Blocks'

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
			Fullstack Developer
		</p>
		
		<LinkButton className='btn-secondary' variant='outlined' href="/about">
			Read more about me
		</LinkButton>

		<LinkButton className='btn-primary' variant='contained' href="/projects">
			View my projects
		</LinkButton>
	</Container>
);