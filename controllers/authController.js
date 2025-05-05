const User = require('../models/User');

exports.getLogin = (req, res) => {
  res.render('auth/login', { title: 'Login' });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).render('auth/login', { 
        title: 'Login', 
        error: 'Invalid credentials' 
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).render('auth/login', { 
        title: 'Login', 
        error: 'Invalid credentials' 
      });
    }

    req.session.user = user;
    req.session.isAuthenticated = true;

    if (user.role === 'admin') {
      return res.redirect('/admin/dashboard');
    } else {
      return res.redirect('/user/dashboard');
    }
  } catch (err) {
    console.error(err);
    res.status(500).render('auth/login', { 
      title: 'Login', 
      error: 'Server error' 
    });
  }
};

exports.getRegister = (req, res) => {
    res.render('auth/register', { 
        title: 'Register',
        layout: 'layouts/layout'  // Explicitly set layout
    });
};

exports.postRegister = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  
  try {
    if (password !== confirmPassword) {
      return res.status(400).render('auth/register', { 
        title: 'Register', 
        error: 'Passwords do not match' 
      });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).render('auth/register', { 
        title: 'Register', 
        error: 'User already exists' 
      });
    }

    const user = new User({ username, email, password });
    await user.save();

    req.session.user = user;
    req.session.isAuthenticated = true;
    res.redirect('/user/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).render('auth/register', { 
      title: 'Register', 
      error: 'Server error' 
    });
  }
};

exports.getLogout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.redirect('/');
    }
    res.clearCookie('connect.sid');
    res.redirect('/auth/login');
  });
};