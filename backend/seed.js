import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Car from './models/Car.js';
import Driver from './models/Driver.js';

dotenv.config();

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin'
  },
  {
    name: 'Test User',
    email: 'user@example.com',
    password: 'password123',
    role: 'user'
  }
];

const cars = [
  {
    name: 'Maruti Suzuki Swift',
    model: '2023',
    pricePerDay: 1500,
    availability: true,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'A popular, fuel-efficient hatchback perfect for city drives and narrow roads.',
    seats: 5,
    transmission: 'Manual',
    fuelType: 'Petrol'
  },
  {
    name: 'Tata Nexon',
    model: '2023',
    pricePerDay: 2000,
    availability: true,
    image: 'https://images.unsplash.com/photo-1518987048-93e29699e79a?auto=format&fit=crop&w=800&q=80',
    description: 'Safe and sturdy compact SUV with great ground clearance and comfort.',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol'
  },
  {
    name: 'Hyundai i20',
    model: '2022',
    pricePerDay: 1800,
    availability: true,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Premium hatchback offering a spacious cabin and smooth driving experience.',
    seats: 5,
    transmission: 'Manual',
    fuelType: 'Petrol'
  },
  {
    name: 'Mahindra XUV300',
    model: '2022',
    pricePerDay: 2200,
    availability: false,
    image: 'https://placehold.co/800x400/374151/ffffff?text=Mahindra+XUV300',
    description: 'Powerful and feature-rich compact SUV for both city and highway journeys.',
    seats: 5,
    transmission: 'Manual',
    fuelType: 'Diesel'
  },
  {
    name: 'Kia Seltos',
    model: '2023',
    pricePerDay: 2500,
    availability: true,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'A stylish and tech-loaded compact SUV suitable for urban driving.',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol'
  },
  {
    name: 'Honda City',
    model: '2022',
    pricePerDay: 2200,
    availability: true,
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'A premium, comfortable sedan that is well-loved for family trips.',
    seats: 5,
    transmission: 'Manual',
    fuelType: 'Petrol'
  },
  {
    name: 'Toyota Innova Crysta',
    model: '2023',
    pricePerDay: 3500,
    availability: true,
    image: 'https://placehold.co/800x400/2563eb/ffffff?text=Toyota+Innova',
    description: 'Spacious and highly reliable MPV, perfect for long road trips with the whole family.',
    seats: 7,
    transmission: 'Automatic',
    fuelType: 'Diesel'
  },
  {
    name: 'Tata Tiago',
    model: '2022',
    pricePerDay: 1200,
    availability: true,
    image: 'https://placehold.co/800x400/10b981/ffffff?text=Tata+Tiago',
    description: 'Compact, peppy, and extremely affordable hatchback for quick commutes.',
    seats: 5,
    transmission: 'Manual',
    fuelType: 'Petrol'
  },
  {
    name: 'Mahindra Scorpio-N',
    model: '2023',
    pricePerDay: 3000,
    availability: true,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80',
    description: 'Rugged and imposing SUV with commanding road presence and comfort.',
    seats: 7,
    transmission: 'Automatic',
    fuelType: 'Diesel'
  }
];

const drivers = [
  {
    name: 'James Wilson',
    age: 35,
    experience: 8,
    licenseNumber: 'LIC-789012',
    rating: 4.8,
    phone: '+1-555-0198',
    availability: true,
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Michael Chen',
    age: 42,
    experience: 15,
    licenseNumber: 'LIC-345678',
    rating: 4.9,
    phone: '+1-555-0234',
    availability: true,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Sarah Davis',
    age: 28,
    experience: 5,
    licenseNumber: 'LIC-901234',
    rating: 4.7,
    phone: '+1-555-0678',
    availability: false,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/car-rental');

    await User.deleteMany();
    await Car.deleteMany();
    await Driver.deleteMany();

    // Hash passwords before inserting
    const salt = await bcrypt.genSalt(10);
    users[0].password = await bcrypt.hash(users[0].password, salt);
    users[1].password = await bcrypt.hash(users[1].password, salt);

    await User.insertMany(users);
    await Car.insertMany(cars);
    await Driver.insertMany(drivers);

    console.log('Data Imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
