import React from 'react';
import { Link } from 'react-router-dom'


const Header = () => {
  return (
    <div className="header">
      <div className="bounds">
        <Link to="/"><h1 className="header--logo">Courses</h1></Link>
        <nav>
          {/*ToDo. Generate fragment based on Auth User*/}
          <React.Fragment>
            <span>Welcome Joe Smith!</span>
            <Link to="/signout">Sign Out</Link>
          </React.Fragment>
          <React.Fragment>
            <Link className="signup" to="/signup">Sign Up</Link>
            <Link className="signin" to="/signin">Sign In</Link>
          </React.Fragment>
        </nav>
      </div>
    </div>
  )

}

export default Header;