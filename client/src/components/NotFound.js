import React from 'react';
import { NavLink } from 'react-router-dom'

const NotFound = () => (
  <div className="bounds">
    <h1>Page not found!</h1>
    <NavLink to={'/'} className="button button-secondary" >Return to Courses</NavLink>
  </div>
)

export default NotFound;