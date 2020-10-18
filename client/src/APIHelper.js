// Base URL for API
const API_URL = 'http://localhost:5000/api';

export class APIHelper {
  
  /**
   * 
   * @param {string} path - API path 
   * @param {string} method - GET, POST, PUT, or DELETE
   * @param {Object} body - Request data. ie User or Course data to update
   * @param {BOOL} [requiresAuth] - Specifies if authorization is required
   * @param {*} [credentials] - User credentials for auth
   */
  api(path, method = 'GET', body = null, requiresAuth = null, credentials = null) {
    const url = API_URL + path;
    
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body)
    }
    // Checks if auth is required and then encodes credentials in base64
    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization']= `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  async getUser(username,password) {
    const response = await this.api('/users', 'GET', null, true, { username, password });
    if(response.status === 200) {
      return response.json().then(data => data)
    } else if (response.status === 401 ) {
      //TODO error message if unauthorized
      return null;
    }
    else {
      throw new Error();
    }
  }

  async createUser(user) {
  const response = await this.api('/users', 'POST', user);
  if (response.status === 201) {
    return [];
  } else if (response.status === 400) {
    //Data validation errors. Need to test
    return response.json().then(data => {
      return data.errors;
    });
  } else {
    throw new Error();
    }
  }

  async getCourses() {
    const response = await this.api('/courses', 'GET')
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error();
    }
  }
  
  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, 'GET');
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 404) {
      //Testing needed for 404 error. Redirect needed to error page
      console.log('Course not found...', response.json())
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
  
  async createCourse(course, username, password) {
    const response = await this.api('/courses', 'POST', course, true, {username, password});
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      //Validation testing needed
      return response.json().then(data => {
        return data.errors
      });
    } else {
      throw new Error();
    }
  }

  async updateCourse(id, course, username, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, {username, password});
    if (response.status === 204) {
      return [];
    } else if (response.status === 400){
      return response.json().then(data => {
        return data.errors
      });
    } // TODO add 403 - forbidden catch 
      // TODO add 404 - not found error catch
    else {
      throw new Error();
    }
  }

  async deleteCourse(id, username, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {username, password});
    if (response.status === 204) {
      return [];
    } else if (response.status === 400){
      return response.json().then(data => {
        return data.errors
      });
    } // TODO add 403 - forbidden catch 
      // TOD add 404 - not found catch
    else {
      throw new Error();
    }
  }
}
