import React from "react"

import { Container, Grid } from '@material-ui/core'

import { Footer } from '../Blocks'

export default function About() {
  return (
    <Container>
      <section className="section">
        <Grid container direction="row" spacing={5} justify="space-between" alignItems="center">
          <Grid item xs={12} md={4}>
            <img src="/assets/Profile Pic Robot-01.png" alt="Photo of me" style={{ borderRadius: "500px", width: "100%" }} />
          </Grid>

          <Grid item xs={12} md={8}>
            <p className='hero-body'>
              Maecenas elementum elit rutrum odio scelerisque consectetur. Mauris at urna accumsan, dapibus nibh eu, tristique lorem. Donec in tellus sit amet sapien vulputate luctus facilisis nec mi.
            </p>
          </Grid>
        </Grid>
      </section>

      <section className="section">
        <Footer />
      </section>
    </Container>
  )
}
