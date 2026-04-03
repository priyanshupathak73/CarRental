import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, User } from 'lucide-react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get('/bookings/mybookings');
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <div className="text-center py-20 text-xl font-medium">Loading your bookings...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
          <p className="text-xl text-gray-500 mb-4">You have no bookings yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-bold text-gray-900">Car</th>
                  <th className="px-6 py-4 font-bold text-gray-900">Dates</th>
                  <th className="px-6 py-4 font-bold text-gray-900">Driver</th>
                  <th className="px-6 py-4 font-bold text-gray-900">Total Price</th>
                  <th className="px-6 py-4 font-bold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b border-gray-200">
                      <div className="font-bold text-gray-900">{booking.car?.name}</div>
                      <div className="text-sm text-gray-500">{booking.car?.model}</div>
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">
                      {booking.withDriver && booking.driver ? (
                        <span className="flex items-center text-blue-600 font-medium">
                          <User className="w-4 h-4 mr-1" />
                          {booking.driver.name}
                        </span>
                      ) : (
                        <span className="text-gray-400">Self Drive</span>
                      )}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 font-bold text-gray-900">
                      ₹{booking.totalPrice}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        booking.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        booking.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                        booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
