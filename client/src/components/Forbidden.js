import React from 'react';
import { NavLink } from 'react-router-dom';

const Forbidden = () => (
  <div className="bounds">
    <h1>Forbidden</h1>
    <p>You can not access the requested page.</p>
    <NavLink to={'/'} className="button button-secondary" >Return to Courses</NavLink>
  </div>
)

export default Forbidden;