import Driver from '../models/Driver.js';

// @desc    Get all drivers
// @route   GET /api/drivers
// @access  Public
export const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({});
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get available drivers
// @route   GET /api/drivers/available
// @access  Public
export const getAvailableDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({ availability: true });
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single driver
// @route   GET /api/drivers/:id
// @access  Public
export const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (driver) {
      res.json(driver);
    } else {
      res.status(404).json({ message: 'Driver not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a driver
// @route   POST /api/drivers
// @access  Private/Admin
export const createDriver = async (req, res) => {
  try {
    const { name, age, experience, licenseNumber, rating, phone, availability, photo } = req.body;

    const driverExists = await Driver.findOne({ licenseNumber });
    if (driverExists) {
      return res.status(400).json({ message: 'Driver with this license already exists' });
    }

    const driver = new Driver({
      name,
      age,
      experience,
      licenseNumber,
      rating: rating || 5,
      phone,
      availability: availability !== undefined ? availability : true,
      photo: photo || '/images/driver-sample.jpg'
    });

    const createdDriver = await driver.save();
    res.status(201).json(createdDriver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a driver
// @route   PUT /api/drivers/:id
// @access  Private/Admin
export const updateDriver = async (req, res) => {
  try {
    const { name, age, experience, licenseNumber, rating, phone, availability, photo } = req.body;

    const driver = await Driver.findById(req.params.id);

    if (driver) {
      driver.name = name || driver.name;
      driver.age = age || driver.age;
      driver.experience = experience || driver.experience;
      driver.licenseNumber = licenseNumber || driver.licenseNumber;
      driver.rating = rating || driver.rating;
      driver.phone = phone || driver.phone;
      driver.availability = availability !== undefined ? availability : driver.availability;
      driver.photo = photo || driver.photo;

      const updatedDriver = await driver.save();
      res.json(updatedDriver);
    } else {
      res.status(404).json({ message: 'Driver not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a driver
// @route   DELETE /api/drivers/:id
// @access  Private/Admin
export const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);

    if (driver) {
      await driver.deleteOne();
      res.json({ message: 'Driver removed' });
    } else {
      res.status(404).json({ message: 'Driver not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
