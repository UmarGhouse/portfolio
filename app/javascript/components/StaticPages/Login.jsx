import React, { Component } from 'react'
import { Container, TextField, Button, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import UserContext from '../Contexts/UserContext'

const styles = theme => ({
  loginPage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000000',
    maxWidth: '100vw',
    minHeight: '100vh'
  },
  loginFormContainer: {
    background: '#ffffff',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
    borderRadius: '20px'
  },
  companyLogo: {
    width: '50%'
  },
  forgotPassword: {
    color: 'grey',
    cursor: 'pointer'
  },
  submitButtonSection: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3)
  }
})

class Login extends Component {
  static contextType = UserContext

  state = {
    email: '',
    password: ''
  }

  handleInputChange = event => {
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value
    const { name } = target

    this.setState({
      [name]: value
    })
  }

  handleFormSubmit = event => {
    event.preventDefault()

    const { email, password } = this.state
    const { history } = this.props
    const { login } = this.context

    login(email, password)
    history.goBack()
  }

  render() {
    const { email, password } = this.state
    const { classes } = this.props

    return (
      <Container className={classes.loginPage}>
        <Grid
          container
          item
          className={classes.loginFormContainer}
          direction="column"
          md={4}
          sm={6}
          xs={10}
          justify="center"
          alignItems="center"
        >
          <form onSubmit={this.handleFormSubmit}>
            <Grid item container direction="column" justify="center" alignItems="center">
              <TextField
                required
                autoFocus
                type="email"
                name="email"
                onChange={this.handleInputChange}
                value={email}
                label="Email"
                margin="normal"
                variant="outlined"
              />

              <TextField
                required
                type="password"
                name="password"
                onChange={this.handleInputChange}
                value={password}
                label="Password"
                margin="normal"
                variant="outlined"
              />

              <Button
                className={classes.submitButtonSection}
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={!(email.length > 2 && password.length > 2)}
                onClick={this.handleFormSubmit}
              >
                Login
              </Button>
            </Grid>
          </form>
        </Grid>
      </Container>
    )
  }
}

export default withStyles(styles)(Login)
