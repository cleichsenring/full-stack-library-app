import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// Component Imports
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';

// Context import and wrapping components
import withContext from './Context';

const HeaderWithContext = withContext(Header);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const UserSignUpWithContext = withContext(UserSignUp);
const CreateCourseWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);

function App() {
  return (
    <Router>
      <div>
        <HeaderWithContext />

        <Switch>
          <Route exact path="/" component={Courses} />
          <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
          <Route path="/courses/:id" component={CourseDetailWithContext} />
          <PrivateRoute path="/courses/:id/update" component={UpdateCourse} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;