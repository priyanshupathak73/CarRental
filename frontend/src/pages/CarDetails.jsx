import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Users, Settings, Fuel, CheckCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data } = await axios.get(`/cars/${id}`);
        setCar(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching car details:', error);
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  if (loading) return <div className="text-center py-20 text-xl text-gray-500">Loading details...</div>;
  if (!car) return <div className="text-center py-20 text-xl text-red-500">Car not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          
          {/* Car Image */}
          <div className="lg:w-1/2 relative bg-gray-100 flex items-center justify-center p-8 lg:p-0">
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={car.image} 
              alt={car.name} 
              className="w-full h-auto object-cover max-h-125"
            />
          </div>

          {/* Car Info */}
          <div className="lg:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-4xl font-extrabold text-gray-900">{car.name}</h1>
                <div className={`px-4 py-1 rounded-full text-sm font-bold ${car.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {car.availability ? 'Available' : 'Unavailable'}
                </div>
              </div>
              <p className="text-xl text-gray-500 font-medium mb-6">{car.model}</p>
              
              <div className="flex items-baseline space-x-2">
                <span className="text-5xl font-extrabold text-blue-600">₹{car.pricePerDay}</span>
                <span className="text-xl text-gray-500 font-medium">/ day</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 mb-8 grid grid-cols-2 gap-y-6">
              <div className="flex flex-col">
                <div className="flex items-center text-gray-500 mb-1">
                  <Users className="w-5 h-5 mr-2" />
                  <span className="font-medium">Capacity</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{car.seats} Seats</span>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center text-gray-500 mb-1">
                  <Settings className="w-5 h-5 mr-2" />
                  <span className="font-medium">Transmission</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{car.transmission}</span>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center text-gray-500 mb-1">
                  <Fuel className="w-5 h-5 mr-2" />
                  <span className="font-medium">Fuel Type</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{car.fuelType}</span>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <Info className="w-5 h-5 mr-2 text-blue-600" />
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed font-light">
                {car.description || `Enjoy the ride with our luxurious ${car.name}. Fully maintained and sanitized for your comfort and safety. Ready for your next journey.`}
              </p>
            </div>

            <div className="mt-auto">
              {car.availability ? (
                <Link 
                  to={`/book/${car._id}`}
                  className="block w-full text-center bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Book This Car
                </Link>
              ) : (
                <button 
                  disabled
                  className="w-full bg-gray-200 text-gray-500 py-4 rounded-2xl font-bold text-lg cursor-not-allowed"
                >
                  Currently Unavailable
                </button>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
