const Bike = require('../models/Bike');

// GET /bikes?brand=KTM&model=Duke
exports.getAllBikes = async (req, res) => {
  try {
    const { brand, model } = req.query;
    const query = {};
    if (brand) query.brand = new RegExp(brand, 'i');
    if (model) query.model = new RegExp(model, 'i');

    const bikes = await Bike.find(query);
    res.json(bikes);
  } catch (error) {
    console.error('Error fetching bikes:', error.message);
    res.status(500).json({ error: 'Failed to fetch bikes' });
  }
};

// GET /bikes/:id
exports.getBikeById = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) return res.status(404).json({ error: 'Bike not found' });
    res.json(bike);
  } catch (error) {
    console.error('Error fetching bike:', error.message);
    res.status(500).json({ error: 'Failed to fetch bike' });
  }
};

// POST /bikes
exports.addBike = async (req, res) => {
  try {
    const {
      name,
      type,
      brand,
      model,
      year,
      price,
      kilometers_driven,
      location,
      imageUrl
    } = req.body;

    // Validate required fields
    if (!name || !type || !brand || !model || !year || !price || kilometers_driven === undefined || !location || !imageUrl) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate price
    if (typeof price !== 'number' || price <= 5000) {
      return res.status(400).json({ error: 'Price must be a number greater than 5000' });
    }

    // Validate kilometers_driven
    if (typeof kilometers_driven !== 'number' || kilometers_driven < 0) {
      return res.status(400).json({ error: 'Kilometers driven must be a non-negative number' });
    }

    // Validate year
    const currentYear = new Date().getFullYear();
    if (
      typeof year !== 'number' ||
      !Number.isInteger(year) ||
      year < currentYear - 10 ||
      year > currentYear
    ) {
      return res.status(400).json({ error: `Year must be an integer between ${currentYear - 10} and ${currentYear}` });
    }

    const bike = await Bike.create({
      name,
      type,
      brand,
      model,
      year,
      price,
      kilometers_driven,
      location,
      imageUrl,
      sellerId: req.user._id
    });

    res.status(201).json(bike);
  } catch (err) {
    console.error('❌ Error adding bike:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// PUT /bikes/:id
exports.editBike = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) return res.status(404).json({ error: 'Bike not found' });

    if (bike.sellerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    Object.assign(bike, req.body);
    await bike.save();
    res.json(bike);
  } catch (error) {
    console.error('Error updating bike:', error.message);
    res.status(500).json({ error: 'Failed to update bike' });
  }
};

// DELETE /bikes/:id
exports.deleteBike = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) return res.status(404).json({ error: 'Bike not found' });

    if (bike.sellerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await bike.deleteOne(); // ✅ modern and correct
    res.json({ message: 'Bike deleted' });
  } catch (error) {
    console.error('Error deleting bike:', error.message);
    res.status(500).json({ error: 'Failed to delete bike' });
  }
};

exports.getBikesByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const bikes = await Bike.find({ sellerId: userId });
    res.json(bikes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user listings' });
  }
};
