const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middlewares/auth');

// User dashboard
router.get('/dashboard', ensureAuthenticated, userController.getDashboard);

// Property viewing
router.get('/properties', ensureAuthenticated, userController.getProperties);
router.get('/properties/:id', ensureAuthenticated, userController.getProperty);

// Property actions
router.post('/properties/:id/rent', ensureAuthenticated, userController.postRentProperty);
router.post('/properties/:id/buy', ensureAuthenticated, userController.postBuyProperty);
router.post('/properties/:id/review', ensureAuthenticated, userController.postAddReview);

module.exports = router;