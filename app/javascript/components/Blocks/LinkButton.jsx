import React from 'react'
import { Link } from "react-router-dom"
import { Button, withStyles } from '@material-ui/core'

const styles = (theme) => ({
  buttonSpacing: {
    margin: '5px',
    marginBottom: '15px',
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

const LinkButton = ({className, variant, href, classes, children, size}) => (
  <div className="btn-container">
    <Button 
      className={className} 
      size={size} 
      classes={{ 
        root: size === "small" ? null : classes.buttonSpacing, 
        label: size === "small" ? null : classes.buttonLabel 
      }} 
      variant={variant} 
      component={Link} 
      to={href}
    >
      {children}
    </Button>
  </div>
)

export default withStyles(styles)(LinkButton)