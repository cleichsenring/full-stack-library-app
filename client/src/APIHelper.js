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
  api(path, method = 'GET', body = null, requiresAuth = null, token) {
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
      options.headers['Authorization']= `${token}`;
    }
    return fetch(url, options);
  }

  /**
   * 
   * @param {string} token - auth token encoded in BASIC base64 with the following pattern {emailAddress}:{password}
   * Gets user object if signin successful
   */
  async getUser(token) {
    const response = await this.api('/users', 'GET', null, true, token);
    if(response.status === 200) {
      return response.json().then(data => data)
    } else if (response.status === 401 ) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  /**
   * 
   * @param {Object} user - object containing {firstName, lastName, emailAddress, password}
   * Create a new user in the DB. Returns validation errors if not successful
   */
  async createUser(user) {
  const response = await this.api('/users', 'POST', user);
  if (response.status === 201) {
    return [];
  } else if (response.status === 400) {
    return response.json().then(data => {
      return data.errors;
    });
  } else {
    throw new Error();
    }
  }

  /**
   * Retrieve all courses from the DB
   */
  async getCourses() {
    const response = await this.api('/courses', 'GET')
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error();
    }
  }
  
  /**
   * 
   * @param {int} id - PK of the course being retrieved
   * Retrieves a specific course object 
   */
  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, 'GET');
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 404) {
      return response.status;
    } else {
      throw new Error();
    }
  }
  /**
   * 
   * @param {Object} course - object containing { title, description, [estimatedTime], [materialsNeeded] }
   * @param {string} token - auth token encoded in BASIC base64 with the following pattern {emailAddress}:{password}
   */
  async createCourse(course, token) {
    const response = await this.api('/courses', 'POST', course, true, token);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors
      });
    } else {
      throw new Error();
    }
  }

  /**
   * 
   * @param {int} id -  PK of the course being updated
   * @param {Object} course - object containing { title, description, [estimatedTime], [materialsNeeded] }
   * @param {string} token - auth token encoded in BASIC base64 with the following pattern {emailAddress}:{password}
   */
  async updateCourse(id, course, token) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, token);
    if (response.status === 204) {
      return [];
    } else if (response.status === 400){
      return response.json().then(data => {
        return data.errors
      });
    } else {
      throw new Error();
    }
  }

  /**
   * 
   * @param {int} id -  PK of the course being deleted
   * @param {string} token - auth token encoded in BASIC base64 with the following pattern {emailAddress}:{password}
   */
  async deleteCourse(id, token) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, token);
    if (response.status === 204) {
      return [];
    } else if (response.status === 400){
      return response.json().then(data => {
        return data.errors
      });
    } else {
      throw new Error();
    }
  }
}
