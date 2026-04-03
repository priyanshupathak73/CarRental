import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CarFront, ShieldCheck, MapPin } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <img 
            src="https://images.unsplash.com/photo-1503377225947-fde01b3eb3af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4"
          >
            Premium Car Rental & Driver Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto"
          >
            Experience luxury and convenience. Rent your dream car with an optional professional chauffeur service.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/cars" className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg inline-block">
              Explore Our Fleet
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose Car Rental?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl text-center shadow-sm hover:shadow-md transition">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <CarFront className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Vast Collection</h3>
              <p className="text-gray-600 font-light">From compact hatchbacks to luxury SUVs, find the perfect vehicle for your journey.</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl text-center shadow-sm hover:shadow-md transition">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Drivers</h3>
              <p className="text-gray-600 font-light">Opt for our highly rated, professional drivers for a relaxing, stress-free trip.</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl text-center shadow-sm hover:shadow-md transition">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Anywhere Delivery</h3>
              <p className="text-gray-600 font-light">Get your car delivered directly to your home, office, or airport terminal.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
