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
            <img src="/assets/Profile Pic Robot-01.png" alt="Photo of me" style={{ borderRadius: "500px", width: "100%" }} />
          </Grid>

          <Grid item xs={12} md={8}>
            <p className='hero-body'>
              Hey everyone!
            </p>

            <p className='hero-body'>
              I'm Umar <span role="img">🖐🏽</span>. Self-taught developer and all-around nerd. Like I said on the{' '}
              <Link to={"/"} component={RouterLink}>homepage</Link>, I work with Ruby-on-Rails and React to create
              valuable web products that help people. More recently, I've also done a few projects with Node.js and Express.
            </p>
          </Grid>

          <Grid item xs={12}>
            <p className="hero-body">
              Many of my projects so far have been around building tools and services for clients and team mates at my current company to use.
              This involved mailing systems, web-based platforms for hosting research and other content, a subscription management platform 
              and some scripts to help automate some tasks.
            </p>

            <p className="hero-body">
              Over the years, my forays into the world of learning online have taught me web development, the basics of {' '}
              <Link href="https://deeplearning.ai/" target="_blank">Machine Learning</Link> and more recently I'm following a foundation 
              in <Link href="https://www.edx.org/course/cs50s-introduction-to-computer-science" target="_blank">Computer Science</Link>. 
            </p>

            <p className="hero-body">
              If you wanna know more about how I think check out my <Link href="https://www.umarghouse.com/" target="_blank">blog</Link>{' '}
              (I write about whatever I'm currently thinking or learning in code, but also other topics I'm interested in, like{' '}
              <Link href="https://www.umarghouse.com/posts/3" target="_blank">Productivity</Link> and {' '}
              <Link href="https://www.umarghouse.com/posts/2" target="_blank">Downtime</Link>).
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
