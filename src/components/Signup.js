import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';

export default class Signup extends React.Component {
  constructor() {
    super()
    this.state = {
      Type: '',
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
    }
    this.changeType = this.changeType.bind(this)
    this.changeFirstName = this.changeFirstName.bind(this)
    this.changeLastName = this.changeLastName.bind(this)
    this.changeEmail = this.changeEmail.bind(this)
    this.changePassword = this.changePassword.bind(this)
  }
  changeType(event) {
    this.setState({
      Type: event.target.value
    })
  }
  changeFirstName(event) {
    this.setState({
      FirstName: event.target.value
    })
  }
  changeLastName(event) {
    this.setState({
      LastName: event.target.value
    })
  }
  changeEmail(event) {
    this.setState({
      Email: event.target.value
    })
  }
  changePassword(event) {
    this.setState({
      Password: event.target.value
    })
  }

  onSubmit(event) {
    event.preventDefault()
    const registered = {
      Type: this.state.Type,
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      Email: this.state.Email,
      Password: this.state.Password
    }
    axios.post('http://localhost:4000/User/Ajouter', registered)
      .then(Response => console.log(Response.data))

    this.setState({
      Type: '',
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
    })
  }

  render() {
    return (
      <div>
        <div className='container'>
          <div className='form-div'>
            <form>
            <input
                type="text"
                placeholder="Type"
                onChange={this.changeType}
                value={this.state.Type}
                className='form-control form-group'
              />
              <input
                type="text"
                placeholder="FirstName"
                onChange={this.changeFirstName}
                value={this.state.FirstName}
                className='form-control form-group'
              />
              <input
                type="text"
                placeholder="LastName"
                onChange={this.changeLastName}
                value={this.state.LastName}
                className='form-control form-group'
              />
              <input
                type="text"
                placeholder="Email"
                onChange={this.changeEmail}
                value={this.state.Email}
                className='form-control form-group'
              />
              <input
                type="Password"
                placeholder="Password"
                onChange={this.changePassword}
                value={this.state.Password}
                className='form-control form-group'
              />
              <input type="submit" className='btn btn-danger btn-block' value="Submit" />

            </form>
          </div>
        </div>
      </div>
    )
  }
}

