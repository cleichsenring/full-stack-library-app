import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';


export default class CourseDetail extends Component {
 
  state = { course: null }

  componentDidMount() {
    this.props.context.helper.getCourse(this.props.match.params.id)
      .then(res => {
        if (res === 404) {
          this.props.history.push('/notfound');
        } else {
          this.setState({course: res});
        }
      })
      .catch(() => this.props.history.push('/error'));
  }

  deleteCourse = () => {
    this.props.context.helper.deleteCourse(this.state.course.id, this.props.context.token)
      .then(this.props.history.push('/'))
      .catch(() => this.props.history.push('/error'));
  }

  render() {
    if(!this.state.course) {
      return ("Loading course....")
    }
    const { course } = this.state;
    const { id } = this.props.match.params;
    const authUser = this.props.context.authenticatedUser;
    let actions;
      if(authUser && course.userId === authUser.id) {
        actions = 
          <span>
            <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
            <button className="button" onClick={this.deleteCourse} >Delete Course</button>
          </span>
      }
    
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              {actions}
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
              <ReactMarkdown>{course.description}</ReactMarkdown>
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
                    <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    );
  }
}