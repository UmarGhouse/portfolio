import React from 'react'

import { Grid, Typography, Link, Tooltip, Divider, Icon } from '@material-ui/core'
import InstagramIcon from '@material-ui/icons/Instagram'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'

export default function Footer() {
  const FooterLink = ({title, href, icon}) => (
    <Tooltip title={title}>
      <Link target="_blank" href={href} className="footer-link">
        {icon}
      </Link>
    </Tooltip>
  )

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
          <FooterLink title="My GitHub Profile" href="https://github.com/UmarGhouse" icon={<GitHubIcon />} />

          <FooterLink title="My LinkedIn Profile" href="https://www.linkedin.com/in/umar-ghouse-020386a4" icon={<LinkedInIcon />} />

          <FooterLink title="My Instagram Page" href="https://www.instagram.com/umarghouse/" icon={<InstagramIcon />} />

          <FooterLink title="My Medium Blog" href="https://umarghouse.medium.com/" icon={<Icon className="fab fa-medium-m" />} />
        </Grid>
      </Grid>
    </>
  )
}