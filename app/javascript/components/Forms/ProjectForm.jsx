import React from 'react'

class ProjectForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      description: "",
      repo_url: "",
      status: "private"
    }
  }

  componentDidUpdate(prevProps) {

    const { currentValues } = this.props

    if (prevProps.currentValues !== currentValues) {
      if (currentValues) {
        this.setState({
          name: currentValues.name,
          description: currentValues.description,
          repo_url: currentValues.repo_url,
          status: currentValues.status
        })
      } else {
        this.setState({
          name: "",
          description: "",
          repo_url: "",
          status: 0
        })
      }
    }
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const {handleSubmit, submitButtonText} = this.props
    const { name, description, repo_url, status } = this.state

    return (
      <form onSubmit={(event) => { handleSubmit(event, this.state) }}>
        <label>Project Name</label>
        <input 
          type="text"
          name="name"
          value={name}
          id="projectName"
          required
          onChange={this.onChange}
        />

        <button type="submit">{submitButtonText}</button>
      </form>
    )
  }
}

export default ProjectForm