const router = require('express').Router();

// Import API route modules
const userRoutes = require('./api/userRoutes');
const thoughtRoutes = require('./api/thoughtRoutes');

// Use API routes
router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtRoutes);

// General route for handling undefined routes - Sends a 404 Not Found response
router.use((req, res) => {
  res.status(404).send('404 Error! Route not found.');
});

module.exports = router;
