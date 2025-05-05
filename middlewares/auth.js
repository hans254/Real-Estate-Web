exports.ensureAuthenticated = (req, res, next) => {
    if (req.session.isAuthenticated) {
      return next();
    }
    res.redirect('/auth/login');
  };
  
  exports.ensureGuest = (req, res, next) => {
    if (!req.session.isAuthenticated) {
      return next();
    }
    res.redirect(req.session.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
  };
  
  exports.ensureAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
      return next();
    }
    res.status(403).render('error', { 
      title: 'Forbidden',
      error: 'Access denied' 
    });
  };