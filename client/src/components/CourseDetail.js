import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { APIHelper } from '../APIHelper';
const helper = new APIHelper();


export default class CourseDetail extends Component {
   state = { course: null }

  componentDidMount() {
    helper.getCourse(this.props.match.params.id).then(res => this.setState({course: res}))
  }

  deleteCourse() {
    //TODO fix this
    helper.deleteCourse()
      .then(this.props.history.push('/'))
      .catch(this.props.history.push('/error'))
  }

  render() {
    if(!this.state.course) {
      return ("Loading course....")
    }
    const { course } = this.state;
    const { id } = this.props.match.params;
    
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                {/* TODO Add delete method */}
                <button className="button" onClick={this.deleteCourse} >Delete Course</button>
              </span>
                <Link className="button button-secondary" to="/">Return to List</Link>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
              <p>By {course.User.firstName} {course.User.lastName}</p>
            </div>
            <div className="course--description">
              <p>{course.description}</p>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                    <p>{course.materialsNeeded}</p>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    );
  }
}