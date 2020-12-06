import React from 'react'
import { Link } from 'react-router-dom'

class ProjectForm extends React.Component {
  render() {
    const {handleSubmit, handleChange} = this.props

    return (
      <form onSubmit={handleSubmit}>
        <label>Project Name</label>
        <input 
          type="text"
          name="name"
          id="projectName"
          required
          onChange={handleChange}
        />

        <button type="submit">Create Project</button>
        
        <Link to="/projects">Back to all Projects</Link>
      </form>
    )
  }
}

export default ProjectForm