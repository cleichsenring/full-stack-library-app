import React from 'react';
import { NavLink } from 'react-router-dom';

const UnhandledError = () => {
  return (
    <div className="bounds">
      <h1>Error</h1>
      <p>An unexpected error has occurred.</p>
      <NavLink to={'/'} className="button button-secondary">Return to Courses</NavLink>

    </div>
  )
}

export default UnhandledError;