import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class extends Component {
  render() {
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                <Link className="button" to="#">Update Course</Link>
                <Link className="button" >Delete Course</Link>
              </span>
                <Link className="button button-secondary" to="/">Return to List</Link>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">Course title here</h3>
              <p>By AUTHOR</p>
            </div>
            <div className="course--description">
              <p>This will be the course description</p>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>TIME ESTIMATE</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                  </ul>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    );
  }
}