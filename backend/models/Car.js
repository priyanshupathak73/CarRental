import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  image: { type: String, required: true }, // URL to image
  description: { type: String },
  seats: { type: Number, default: 4 },
  transmission: { type: String, default: 'Manual' },
  fuelType: { type: String, default: 'Petrol' },
}, { timestamps: true });

const Car = mongoose.model('Car', carSchema);
export default Car;
