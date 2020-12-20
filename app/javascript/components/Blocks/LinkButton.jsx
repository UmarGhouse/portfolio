import React from 'react'
import { Link } from "react-router-dom"
import { Button, withStyles } from '@material-ui/core'

const styles = (theme) => ({
  buttonSpacing: {
    margin: '5px',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  buttonLabel: {
    fontFamily: "Montserrat, sans-serif",
    
    [theme.breakpoints.down('md')]: {
      fontSize: '1.2em'
    }
  }
})

const LinkButton = ({className, variant, href, classes, children}) => (
  <Button className={className} classes={{ root: classes.buttonSpacing, label: classes.buttonLabel }} variant={variant} component={Link} to={href}>
    {children}
  </Button>
)

export default withStyles(styles)(LinkButton)