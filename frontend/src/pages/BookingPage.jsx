import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, UserCheck, CreditCard, CarFront } from 'lucide-react';

const BookingPage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Driver logic
  const [withDriver, setWithDriver] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [driverChargePerDay] = useState(500); // INR
  
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const carRes = await axios.get(`/cars/${carId}`);
        setCar(carRes.data);
        
        const driverRes = await axios.get('/drivers/available');
        setDrivers(driverRes.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [carId]);

  useEffect(() => {
    if (startDate && endDate && car) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (end > start) {
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        let total = car.pricePerDay * days;
        if (withDriver) {
          total += driverChargePerDay * days;
        }
        setTotalPrice(total);
      } else {
        setTotalPrice(0);
      }
    }
  }, [startDate, endDate, car, withDriver, driverChargePerDay]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (withDriver && !selectedDriverId) {
      alert('Please select a driver');
      return;
    }
    
    try {
      await axios.post('/bookings', {
        carId,
        driverId: withDriver ? selectedDriverId : null,
        withDriver,
        startDate,
        endDate
      });
      alert('Booking successful!');
      navigate('/my-bookings');
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating booking');
    }
  };

  if (loading) return <div className="text-center py-20">Loading booking form...</div>;
  if (!car) return <div className="text-center py-20 text-red-500">Car not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Calendar className="mr-2 text-blue-600" />
              Select Dates
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input 
                  type="date" 
                  min={new Date().toISOString().split('T')[0]}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input 
                  type="date" 
                  min={startDate || new Date().toISOString().split('T')[0]}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>
            </div>

            <hr className="my-8" />
            
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <UserCheck className="mr-2 text-blue-600" />
              Do you want a driver?
            </h2>
            
            <div className="flex items-center mb-6">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={withDriver}
                  onChange={(e) => {
                    setWithDriver(e.target.checked);
                    if (!e.target.checked) setSelectedDriverId(null);
                  }}
                />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-lg font-medium text-gray-900">
                  Yes, add a driver (+₹{driverChargePerDay}/day)
                </span>
              </label>
            </div>

            {withDriver && (
              <div className="bg-blue-50 p-6 rounded-xl mb-6 border border-blue-100">
                <h3 className="font-bold text-gray-900 mb-4">Select Available Driver</h3>
                {drivers.length === 0 ? (
                  <p className="text-red-500 font-medium">Sorry, no drivers are currently available.</p>
                ) : (
                  <div className="space-y-4">
                    {drivers.map(driver => (
                      <div 
                        key={driver._id}
                        onClick={() => setSelectedDriverId(driver._id)}
                        className={`flex items-center p-4 rounded-xl cursor-pointer transition ${selectedDriverId === driver._id ? 'bg-blue-600 text-white shadow-md' : 'bg-white hover:bg-gray-50 border border-gray-200'}`}
                      >
                        <img src={driver.photo || 'https://via.placeholder.com/150'} alt={driver.name} className="w-16 h-16 rounded-full object-cover mr-4" />
                        <div className="flex-grow">
                          <h4 className="font-bold text-lg">{driver.name}</h4>
                          <div className={`text-sm flex items-center mt-1 space-x-3 ${selectedDriverId === driver._id ? 'text-blue-100' : 'text-gray-500'}`}>
                            <span>★ {driver.rating}/5</span>
                            <span>{driver.experience} yrs exp</span>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedDriverId === driver._id ? 'border-white' : 'border-gray-300'}`}>
                          {selectedDriverId === driver._id && <div className="w-3 h-3 bg-white rounded-full"></div>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition shadow-lg mt-4 disabled:bg-gray-400"
              disabled={!startDate || !endDate || totalPrice <= 0 || (withDriver && !selectedDriverId)}
            >
              Confirm Booking
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-gray-900 text-white p-6 rounded-2xl sticky top-24">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <CreditCard className="mr-2" />
              Summary
            </h3>
            
            <div className="flex items-center mb-6 pb-6 border-b border-gray-700">
              <img src={car.image} alt={car.name} className="w-20 h-14 object-cover rounded mr-4" />
              <div>
                <h4 className="font-bold">{car.name}</h4>
                <p className="text-gray-400 text-sm">₹{car.pricePerDay} / day</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Rental duration</span>
                <span className="font-medium">
                  {startDate && endDate && new Date(endDate) > new Date(startDate) 
                    ? `${Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))} days` 
                    : '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Driver added</span>
                <span className="font-medium">{withDriver ? 'Yes' : 'No'}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-700 flex justify-between items-end">
              <span className="text-gray-400">Total</span>
              <span className="text-3xl font-extrabold">₹{totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
