const express = require('express');	// Express app
const router = express.Router();	// Router logic
const { expressjwt: jwt } = require('express-jwt');
const auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload',
	algorithms: ['HS256']		// Double quotes?
});

// This is where we import the controllers we will route
const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

router 
	.route('/login')
	.post(authController.login);
	
router
	.route('/register')
	.post(authController.register);

// Define route for our trips endpoint
router
	.route('/trips')
	.get(tripsController.tripsList)			// GET method routes tripList
	.post(auth, tripsController.tripsAddTrip);	// POST method adds a trip
	
// GET method routes tripsFindByCode - requires parameter
// PUT method routes tripsUpdateTrip - requires parameter
router
	.route('/trips/:tripCode')
	.get(tripsController.tripsFindByCode)
	.put(auth, tripsController.tripsUpdateTrip);
	
module.exports = router;
