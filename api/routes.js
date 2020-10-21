// Imports 
const express = require('express');
const asyncHandler = require('express-async-handler');
const { Course , User } = require('./models');
const bcrypt = require('bcryptjs');
const auth = require('basic-auth');

const router = express.Router();


// Filter out attributes for Course routes
const filterOptions = {
  include:[{ 
    model: User,
    attributes: { 
      exclude: ['password', 'createdAt', 'updatedAt']
    } 
  }],
  attributes: { 
    exclude: ['createdAt', 'updatedAt']
  }
}

// User authentication
const authenticateUser = async (req, res, next) => {
  let message = null;

  const credentials = auth(req);

  if (credentials){
    const user = await User.findOne({ where: { emailAddress: credentials.name } });
    if (user) {
      const authenticated = bcrypt.compareSync(credentials.pass, user.password);

      if (authenticated) {
        console.log(`Authentication successful for user: ${user.emailAddress}`);
        req.currentUser = user;
      } else {
        message = `Authentication failed for user: ${user.emailAddress}`
      }

    } else {
      message = `No user with email: ${credentials.name} found.`
    }

  } else {
    message = 'Authorization required!'
  }

  if (message) {
    console.warn(message);
    res.status(401).json({ message: 'Access Denied' });
  } else {
    next();
  }
}

/* User routes */
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: {
      emailAddress: req.currentUser.emailAddress
    },
    attributes: {
      exclude: ['password', 'createdAt', 'updatedAt']
    }
  });
  res.json(user);
}));

router.post('/users', asyncHandler(async (req, res) => {
  try {
    let { firstName, lastName, emailAddress, password } = req.body;
    // Check if password exist before trying to hash
    if(password) {
      password = bcrypt.hashSync(password, 10);
    }
    await User.create({ firstName, lastName, emailAddress, password });
    res.status(201).set('Location', '/').end();
  } catch (error) {
    // Validation error catching
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map( err => err.message );
      console.error('Validation errors: ', errors);
      res.status(400).json({"errors": errors});

      // Unique email constraint error catching
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({"errors": `User with email: ${req.body.emailAddress} already exists!`});
    } else {
      throw error;
    }
  }
}));


/* Courses routes */
router.get('/courses', asyncHandler(async (req, res) => {
  const courses = await Course.findAll(filterOptions);
  res.json(courses);
}));

router.get('/courses/:id', asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id, filterOptions );
  (course) 
    ? res.json(course) 
    : res.status(404).json({message: `Course id: ${req.params.id} not found`});
}));

router.post('/courses', authenticateUser, asyncHandler(async (req, res, next) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).set('Location', `/courses/${course.id}`).end();  
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map( err => err.message );
      console.error('Validation errors: ', errors);
      res.status(400).json({"errors": errors});
    } else {
      throw error;
    }
  }
}));

router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  if (course) {
    if (course.userId === req.currentUser.id) {
      try {
        await course.update(req.body);
        res.status(204).end();
      } catch (error) {
        if (error.name === 'SequelizeValidationError') {
          const errors = error.errors.map( err => err.message );
          console.error('Validation errors: ', errors);
          res.status(400).json({"errors": errors});
        } else {
          throw error;
        }
      }
    } else {
      res.status(403).json({message: "Forbidden"});
    }
  } else {
    res.status(404).json({message: `Course id: ${req.params.id} not found`});
  }
}));

router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  if (course) {
    if (course.userId === req.currentUser.id) { 
      await course.destroy();
      res.status(204).end();   
    } else {
      res.status(403).json({message: "Forbidden"});
    }
  } else {
    res.status(404).json({message: `Course id: ${req.params.id} not found`});
  }
}));


module.exports = router;