import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { AppBar, Toolbar, Typography, Button, makeStyles, Container, useScrollTrigger, Link } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: 'rgba(252,252,252,0)'
  },
  appBarSolid: {
    backgroundColor: 'rgba(252,252,252,1)'
  },
  title: {
    marginRight: 'auto'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 5),
  },
  toolbarMixin: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  navLinksContainer: {
    marginRight: theme.spacing(2),
    width: "100%",
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      display: "inherit",
      width: "auto",
    },
  },
  navLink: {
    padding: '5px',
    margin: '10px'
  }
}))

export default function NavBar(props) {
  const classes = useStyles()

  function ElevationScroll(props) {
    const { children } = props
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    })
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
      className: trigger ? classes.appBarSolid : classes.appbar
    })
  }

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar position="fixed">
          <Container>
            <Toolbar className={classes.toolbar}>
              <Link component={RouterLink} to='/' className={classes.title}>
                <Typography variant="h4">
                  <strong>Umar Ghouse</strong>
                </Typography>
              </Link>

              <div className={classes.navLinksContainer}>
                <Link component={RouterLink} to='/projects' className={classes.navLink}>
                  <Typography>Projects</Typography>
                </Link>

                <Link component={RouterLink} to='/about' className={classes.navLink}>
                  <Typography>About</Typography>
                </Link>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>

      <div className={classes.toolbarMixin} />
    </>
  )
}