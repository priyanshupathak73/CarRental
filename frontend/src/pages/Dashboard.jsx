import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);
  const [drivers, setDrivers] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookRes, carRes, driverRes] = await Promise.all([
          axios.get('/bookings'),
          axios.get('/cars'),
          axios.get('/drivers')
        ]);
        setBookings(bookRes.data);
        setCars(carRes.data);
        setDrivers(driverRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  const updateBookingStatus = async (id, status) => {
    try {
      await axios.put(`/bookings/${id}/status`, { status });
      setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
    } catch (error) {
      alert('Error updating status');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="flex space-x-4 mb-8">
        {['bookings', 'cars', 'drivers'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-xl font-bold capitalize transition ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-6">
        {activeTab === 'bookings' && (
          <div className="overflow-x-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-900 border-b pb-4">Manage Bookings</h2>
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 font-bold text-gray-900">User</th>
                  <th className="px-4 py-3 font-bold text-gray-900">Car</th>
                  <th className="px-4 py-3 font-bold text-gray-900">Driver</th>
                  <th className="px-4 py-3 font-bold text-gray-900">Dates</th>
                  <th className="px-4 py-3 font-bold text-gray-900">Status</th>
                  <th className="px-4 py-3 font-bold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50 text-sm">
                    <td className="px-4 py-3">{booking.user?.name}</td>
                    <td className="px-4 py-3">{booking.car?.name}</td>
                    <td className="px-4 py-3">{booking.driver?.name || 'Self Drive'}</td>
                    <td className="px-4 py-3 text-xs">
                      {new Date(booking.startDate).toLocaleDateString()} - <br/>
                      {new Date(booking.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        booking.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        booking.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                        booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select 
                        value={booking.status}
                        onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'cars' && (
          <div>
            <div className="flex justify-between items-center mb-4 border-b pb-4">
              <h2 className="text-xl font-bold text-gray-900">Manage Cars</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <div key={car._id} className="border rounded-xl p-4 flex items-center shadow-sm">
                  <img src={car.image} alt={car.name} className="w-20 h-16 object-cover rounded mr-4" />
                  <div>
                    <h3 className="font-bold">{car.name}</h3>
                    <p className="text-sm text-gray-500">₹{car.pricePerDay}/day</p>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${car.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {car.availability ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'drivers' && (
          <div>
            <div className="flex justify-between items-center mb-4 border-b pb-4">
              <h2 className="text-xl font-bold text-gray-900">Manage Drivers</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {drivers.map((driver) => (
                <div key={driver._id} className="border rounded-xl p-4 flex items-center shadow-sm">
                  <img src={driver.photo} alt={driver.name} className="w-16 h-16 overflow-hidden rounded-full object-cover mr-4" />
                  <div>
                    <h3 className="font-bold">{driver.name}</h3>
                    <p className="text-sm text-gray-500">{driver.experience} years exp • Rating: {driver.rating}/5</p>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${driver.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {driver.availability ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
