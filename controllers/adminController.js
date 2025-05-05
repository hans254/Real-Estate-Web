const Property = require('../models/Property');

exports.getDashboard = (req, res) => {
  res.render('admin/dashboard', { 
    title: 'Admin Dashboard',
    user: req.session.user
  });
};

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.render('admin/properties', { 
      title: 'Manage Properties',
      properties,
      user: req.session.user
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { 
      title: 'Error',
      error: 'Server error' 
    });
  }
};

exports.getAddProperty = (req, res) => {
  res.render('admin/add-property', { 
    title: 'Add Property',
    user: req.session.user
  });
};

exports.postAddProperty = async (req, res) => {
  const { title, description, price, location, type, bedrooms, bathrooms, area, features } = req.body;
  const images = req.files.map(file => file.filename);
  const featuresArray = features.split(',').map(feature => feature.trim());

  try {
    const property = new Property({
      title,
      description,
      price,
      location,
      type,
      bedrooms,
      bathrooms,
      area,
      features: featuresArray,
      images,
      owner: req.session.user._id
    });

    await property.save();
    res.redirect('/admin/properties');
  } catch (err) {
    console.error(err);
    res.status(500).render('admin/add-property', { 
      title: 'Add Property',
      error: 'Server error',
      user: req.session.user
    });
  }
};

// Add similar methods for edit and delete