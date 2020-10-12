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

  async getUser() {
    const response = await this.api('/users', 'GET')
  }

  async createUser(user) {
  const response = await this.api('/', 'POST', user);
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

  async getCourse() {
    const response = await this.api('/', 'GET')
  }
  
  async getCourses() {
    const response = await this.api('/courses', 'GET')
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error();
    }
  }

  async createCourse() {
    const response = await this.api('/', 'POST')
  }

  async updateCourse() {
    const response = await this.api('/', 'PUT')
  }

  async deleteCourse() {
    const response = await this.api('/', 'DELETE')
  }
}