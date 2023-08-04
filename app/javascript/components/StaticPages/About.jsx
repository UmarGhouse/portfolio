import React from "react"
import { Link as RouterLink } from 'react-router-dom'

import { Container, Grid, Link } from '@material-ui/core'

import { Footer } from '../Blocks'

export default function About() {
  return (
    <Container className='home'>
      <section className="section">
        <Grid container direction="row" spacing={5} justify="space-between" alignItems="center">
          <Grid item xs={12} md={4}>
            <img src="/assets/profile_pic.png" alt="Photo of me" style={{ borderRadius: "500px", width: "100%" }} />
          </Grid>

          <Grid item xs={12} md={8}>
            <p className='hero-body'>
              Hey everyone!
            </p>

            <p className='hero-body'>
              I'm Umar <span role="img">🖐🏽</span>. Self-taught developer and all-around nerd. Like I said on the{' '}
              <Link to={"/"} component={RouterLink}>homepage</Link>, I primarily work with Node.js and React to create
              valuable web products that help people. In the past, I've also done a few projects with Ruby-on-Rails.
            </p>
          </Grid>

          <Grid item xs={12}>
            <p className="hero-body">
              Many of my projects so far have been around building tools and services for clients and team mates at the companies that I've worked at.
              This involved an Inventory Action Platform at <Link href="https://cogsy.com/" target="_blank">Cogsy</Link> and a few internal systems at <Link href="https://www.frontiergroup.info/" target="_blank">Frontier Research</Link> - namely, mailing systems, web-based platforms for hosting research and other content, a subscription management platform 
              and some scripts to help automate some tasks.
            </p>

            <p className="hero-body">
              Over the years, my forays into the world of learning online have taught me web development, some basic DevOps, the basics of {' '}
              <Link href="https://deeplearning.ai/" target="_blank">Machine Learning</Link> and more recently I'm following a foundation 
              in <Link href="https://www.edx.org/course/cs50s-introduction-to-computer-science" target="_blank">Computer Science</Link>. 
            </p>

            <p className="hero-body">
              If you wanna know more about how I think check out my <Link href="https://blog.umarghouse.com/" target="_blank">blog</Link>{' '}
              (I write about whatever I'm currently thinking or learning in code, but also other topics I'm interested in, like{' '}
              <Link href="https://blog.umarghouse.com/posts/3" target="_blank">Productivity</Link> and {' '}
              <Link href="https://blog.umarghouse.com/posts/2" target="_blank">Downtime</Link>).
            </p>
            
            <small>
              I also cross-post to <Link href="https://umarghouse.medium.com/" target="_blank">Medium</Link> if you prefer reading there <span role="img">😬</span>
            </small>
          </Grid>
        </Grid>
      </section>

      <section className="section">
        <Footer />
      </section>
    </Container>
  )
}
