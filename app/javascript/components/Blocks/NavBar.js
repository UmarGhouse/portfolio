import React, { useContext } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import UserContext from '../Contexts/UserContext'

import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  makeStyles, 
  Container, 
  useScrollTrigger, 
  Link, 
  Hidden, 
  Drawer ,
  Button
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 5),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0,1)
    },
  },
  toolbarMixin: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  navLinksContainer: {
    marginRight: theme.spacing(2),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      display: "inherit",
      width: "auto",
    },
  },
  navLink: {
    padding: '10px 20px',
    margin: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#ececec'
    }
  }
}))

export default function NavBar(props) {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = React.useState(false)

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

  const NavLinks = () => {
    const user = useContext(UserContext)

    return (
      <>
        <Hidden implementation="js" mdUp>
          <Link component={RouterLink} to='/' className={classes.navLink} onClick={() => { setDrawerOpen(false) }}>
            <Typography className={classes.navLinkText}>Home</Typography>
          </Link>
        </Hidden>

        <Link component={RouterLink} to='/projects' className={classes.navLink} onClick={() => { setDrawerOpen(false) }}>
          <Typography className={classes.navLinkText}>Projects</Typography>
        </Link>

        <Link href='https://blog.umarghouse.com/' target="_blank" className={classes.navLink} onClick={() => { setDrawerOpen(false) }}>
          <Typography>Blog</Typography>
        </Link>

        <Link component={RouterLink} to='/about' className={classes.navLink} onClick={() => { setDrawerOpen(false) }}>
          <Typography>About</Typography>
        </Link>

        {user.userDetails ? (
          <Link 
            className={classes.navLink} 
            onClick={(event) => {
              event.preventDefault()

              user.logout()
            }}
          >
            <Typography>Logout</Typography>
          </Link>
        ) : (
          <Link component={RouterLink} to='/login' className={classes.navLink} onClick={() => { setDrawerOpen(false) }}>
            <Typography>Login</Typography>
          </Link>
        )}
      </>
    )
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
                <Hidden implementation="js" lgUp>
                  <IconButton className={classes.menuIcon} onClick={() => { setDrawerOpen(true) }}>
                    <MenuIcon />
                  </IconButton>

                  <Drawer anchor="right" open={drawerOpen} onClose={() => { setDrawerOpen(false) }}>
                    <NavLinks />
                  </Drawer>
                </Hidden>

                <Hidden implementation="js" mdDown>
                  <NavLinks />
                </Hidden>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>

      <div className={classes.toolbarMixin} />
    </>
  )
}
