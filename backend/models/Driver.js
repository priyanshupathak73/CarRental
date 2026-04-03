import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  experience: { type: Number, required: true }, // in years
  licenseNumber: { type: String, required: true, unique: true },
  rating: { type: Number, default: 5 },
  phone: { type: String, required: true },
  availability: { type: Boolean, default: true },
  photo: { type: String, required: true } // URL to photo
}, { timestamps: true });

const Driver = mongoose.model('Driver', driverSchema);
export default Driver;
