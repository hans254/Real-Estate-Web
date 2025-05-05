const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAuthenticated, ensureAdmin } = require('../middlewares/auth');

// Admin dashboard
router.get('/dashboard', ensureAuthenticated, ensureAdmin, adminController.getDashboard);

// Add other admin routes...

module.exports = router;