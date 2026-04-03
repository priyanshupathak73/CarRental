import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Users, Settings, Fuel } from 'lucide-react';
import { motion } from 'framer-motion';

const CarListing = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, available

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await axios.get('/cars');
        setCars(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const filteredCars = filter === 'available' 
    ? cars.filter(car => car.availability) 
    : cars;

  if (loading) return <div className="text-center py-20 text-xl text-gray-500">Loading fleet...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Our Fleet</h1>
          <p className="text-gray-600">Choose from our wide variety of premium cars.</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md font-medium transition ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          >
            All Cars
          </button>
          <button 
            onClick={() => setFilter('available')}
            className={`px-4 py-2 rounded-md font-medium transition ${filter === 'available' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          >
            Available Only
          </button>
        </div>
      </div>

      {filteredCars.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
          <p className="text-2xl text-gray-500 mb-4">No cars found matching your criteria.</p>
          <button onClick={() => setFilter('all')} className="text-blue-600 font-medium hover:underline">View All Cars</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={car._id} 
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-56 overflow-hidden bg-gray-100 flex items-center justify-center">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                {!car.availability && (
                 <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                   Unavailable
                 </div>
                )}
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
                    <p className="text-sm text-gray-500 font-medium">{car.model}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-blue-600">₹{car.pricePerDay}</span>
                    <span className="text-sm text-gray-500">/day</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6 pt-4 border-t border-gray-100">
                  <div className="flex flex-col items-center">
                    <Users className="w-5 h-5 text-gray-400 mb-1" />
                    <span className="text-xs text-gray-600 font-medium">{car.seats} Seats</span>
                  </div>
                  <div className="flex flex-col items-center border-l border-r border-gray-100">
                    <Settings className="w-5 h-5 text-gray-400 mb-1" />
                    <span className="text-xs text-gray-600 font-medium">{car.transmission}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Fuel className="w-5 h-5 text-gray-400 mb-1" />
                    <span className="text-xs text-gray-600 font-medium">{car.fuelType}</span>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <Link 
                    to={`/cars/${car._id}`}
                    className={`block w-full text-center py-3 rounded-xl font-bold transition ${car.availability ? 'bg-gray-900 text-white hover:bg-black' : 'bg-gray-200 text-gray-500 cursor-not-allowed pointer-events-none'}`}
                  >
                    {car.availability ? 'View Details' : 'Currently Booked'}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarListing;
