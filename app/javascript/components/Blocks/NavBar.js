import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { AppBar, Toolbar, Typography, Button, Link, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
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
  }
}))

export default function NavBar() {
  const classes = useStyles()

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Button component={RouterLink} to='/' className={classes.title}>
            <Typography>
              Umar Ghouse
            </Typography>
          </Button>

          <div className={classes.navLinksContainer}>
            <Button component={RouterLink} to='/projects'>
              <Typography>Projects</Typography>
            </Button>

            <Button component={RouterLink} to='/about'>
              <Typography>About</Typography>
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <div className={classes.toolbarMixin} />
    </>
  )
}