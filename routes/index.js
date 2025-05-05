const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// 404 page
router.get('/404', (req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

module.exports = router;