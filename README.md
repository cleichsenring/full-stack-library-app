# Full Stack Library Application

---

This application is built with Express for the backend API and React for the user front end. 

The API handles user creation and authentication. The API is built using Node.JS with Express, Sequelize and SQLite.

The customer facing frontend is built with the React library. Key features include:
  
  * Private Routes that redirect to /signin if user is not authenticated
  * User state persisted via cookies
  * User context shared throughout the app via the React Context API 
  * Users are only able to perform UPDATE & DELETE operations on courses that they own
  * Manages course and user data through CRUD operation with an API, persisting to a local SQLite DB

---
To run the app first download the repo and then follow each of the instructions below
### Express App Setup - API
1. Open your terminal and move into the **/api** directory
2. Run ```npm install``` 
3. Run ```npm run seed``` to create and seed the database
4. Run ```npm start``` to start the API server and sync the DB models. Server will run on localhost:5000
5. Open a new terminal window and follow instructions below

### React App Setup - CLIENT
1. Open your terminal and move into the **/client** directory
2. Run ```npm install``` 
3. Run ```npm start``` to start the React frontend. A browser should automatically open to localhost:3000