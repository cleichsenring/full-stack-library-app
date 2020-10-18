import React, { Component } from 'react';
import Form from './Form';

import {APIHelper} from '../APIHelper';
const helper = new APIHelper();


export default class CreatCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: []
  }
  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <Form 
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Create Course"
          elements={() => (
            <React.Fragment>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <input 
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={this.change}
                    className="input-title course--title--input"
                  />
                  <p>Signed In user first + last name go here</p>
                </div>
                <div className="course--description">
                  <textarea 
                    id="description"
                    name="description"
                    value={description}
                    onChange={this.change}
                    placeholder="Course description..."
                  />
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stat--list--item">
                      <h4>Estimated Time</h4>
                      <input 
                        id="estimatedTime"
                        name="estimatedTime"
                        type="text"
                        value={estimatedTime}
                        onChange={this.change}
                        className="course--time--input"
                        placeholder="Hours"
                      />
                    </li>
                    <li className="course--stat--list--item">
                      <h4>Materials Needed</h4>
                      <textarea 
                        id="materialsNeeded"
                        name="materialsNeeded"
                        value={materialsNeeded}
                        onChange={this.change}
                        placeholder="List materials..."
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </React.Fragment>
          )}
        />
        
      </div>
    );
  }

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return { [name]: value };
    });
  }

  cancel = () => {
    this.props.history.push('/');
  }

  submit = () => {
    // TODO finish course creation
    const course = this.state;
    // Context for user Auth needed 
    const username = 'joe@smith.com"'
    const password = 'joepassword'
    helper.createCourse(course, username, password)
      .then()
      .catch(err => {
        console.log(err);
        this.props.history.push('/error')
      })
  }

}