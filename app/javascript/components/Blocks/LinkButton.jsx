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
  }
})

const LinkButton = ({className, variant, href, classes, children}) => (
  <Button className={className} classes={{ root: classes.buttonSpacing }} variant={variant} component={Link} to={href}>
    {children}
  </Button>
)

export default withStyles(styles)(LinkButton)