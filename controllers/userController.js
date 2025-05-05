const Property = require('../models/Property');

exports.getDashboard = (req, res) => {
  res.render('user/dashboard', { 
    title: 'User Dashboard',
    user: req.session.user
  }); 
};

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find({ status: 'available' });
    res.render('user/properties', { 
      title: 'Available Properties',
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

exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner reviews.user');
    res.render('user/property-detail', { 
      title: property.title,
      property,
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

exports.postRentProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    property.status = 'not available';
    await property.save();

    res.json({ success: true, message: 'Property rented successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.postBuyProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    property.status = 'not available';
    await property.save();

    res.json({ success: true, message: 'Property purchased successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.postAddReview = async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    property.reviews.push({
      user: req.session.user._id,
      rating,
      comment
    });

    await property.save();
    res.json({ success: true, message: 'Review added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};