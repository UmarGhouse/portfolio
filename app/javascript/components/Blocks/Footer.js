import React from 'react'

import { Grid, Typography, Link, Tooltip, Divider, Icon } from '@material-ui/core'
import InstagramIcon from '@material-ui/icons/Instagram'
import BookIcon from '@material-ui/icons/Book'

export default function Footer() {
  return (
    <>
      <Divider />
      
      <br />

      <Grid container justify="space-between" alignItems="center" spacing={3}>
        <Grid item>
          <Typography>
            &copy; Umar Ghouse, {(new Date().getFullYear())}
          </Typography>
        </Grid>

        <Grid item>
          <Tooltip title="My Instagram page">
            <Link target="_blank" href="https://www.instagram.com/umarghouse/" className="footer-link">
              <InstagramIcon />
            </Link>
          </Tooltip>

          <Tooltip title="My Medium Blog">
            <Link target="_blank" href="https://umarghouse.medium.com/" className="footer-link">
              <Icon className="fab fa-medium-m" />
            </Link>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  )
}