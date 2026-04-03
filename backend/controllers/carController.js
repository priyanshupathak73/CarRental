import Car from '../models/Car.js';

// @desc    Get all cars
// @route   GET /api/cars
// @access  Public
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find({});
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single car
// @route   GET /api/cars/:id
// @access  Public
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ message: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a car
// @route   POST /api/cars
// @access  Private/Admin
export const createCar = async (req, res) => {
  try {
    const car = new Car({
      name: req.body.name || 'Sample Car',
      model: req.body.model || 'Sample Model',
      pricePerDay: req.body.pricePerDay || 0,
      image: req.body.image || '/images/sample.jpg',
      description: req.body.description || 'Sample description',
      seats: req.body.seats || 4,
      transmission: req.body.transmission || 'Manual',
      fuelType: req.body.fuelType || 'Petrol',
      availability: req.body.availability !== undefined ? req.body.availability : true
    });

    const createdCar = await car.save();
    res.status(201).json(createdCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a car
// @route   PUT /api/cars/:id
// @access  Private/Admin
export const updateCar = async (req, res) => {
  try {
    const { name, model, pricePerDay, image, description, seats, transmission, fuelType, availability } = req.body;

    const car = await Car.findById(req.params.id);

    if (car) {
      car.name = name || car.name;
      car.model = model || car.model;
      car.pricePerDay = pricePerDay || car.pricePerDay;
      car.image = image || car.image;
      car.description = description || car.description;
      car.seats = seats || car.seats;
      car.transmission = transmission || car.transmission;
      car.fuelType = fuelType || car.fuelType;
      car.availability = availability !== undefined ? availability : car.availability;

      const updatedCar = await car.save();
      res.json(updatedCar);
    } else {
      res.status(404).json({ message: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a car
// @route   DELETE /api/cars/:id
// @access  Private/Admin
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (car) {
      await car.deleteOne();
      res.json({ message: 'Car removed' });
    } else {
      res.status(404).json({ message: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
