import React from 'react';
import { Link } from 'react-router-dom'

const Header = ({ context }) => {
  const authUser = context.authenticatedUser;
  
  return (
    <div className="header">
      <div className="bounds">
        <Link to="/"><h1 className="header--logo">Courses</h1></Link>
        <nav>
          {/* If user signed in show name and sign out button. Otherwise show Sign In & Sign Out buttons */}
          {authUser ?
            <React.Fragment>
              <span>Welcome {authUser.firstName} {authUser.lastName}!</span>
              <Link to="/signout">Sign Out</Link>
            </React.Fragment>
            :
            <React.Fragment>
              <Link className="signup" to="/signup">Sign Up</Link>
              <Link className="signin" to="/signin">Sign In</Link>
            </React.Fragment>
          }
        </nav>
      </div>
    </div>
  )
}

export default Header;