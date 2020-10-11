
# REST API Project
Restful API to manage *Users* and *Courses*. 

### Key features:
- User passwords are hashed before being stored into DB. 
- Users are only allowed to preform  **PUT** and **DELETE** operations on *Courses* that they own.
- Data validation for both *User* and *Course* routes
- Password, createdAt & updatedAt are filtered out of responses
- User email address must be valid and unique

- The following routes are protected with basic authentication:
  - GET /api/users
  - POST /api/courses
  - PUT /api/courses/:id
  - DELETE /api/courses/:id

## Key technologies
---
- ExpressJS
- Sequelize
- BcryptJS
- SQLite

## Getting Started

To get up and running with this project, run the following commands from the root of the folder that contains this README file.

First, install the project's dependencies using `npm`.

```
npm install
```

Second, seed the SQLite database.

```
npm run seed
```

And lastly, start the application.

```
npm start
```

To test the Express server, browse to the URL [http://localhost:5000/](http://localhost:5000/).

To test the API open up the ```RESTAPI.postman_collection.json``` in [Postman](https://getpostman.com).
