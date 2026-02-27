import { motion } from 'motion/react';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';

export default function Locations() {
  const locations = [
    {
      name: "Cafe Bliss — College Road",
      address: "College Road, Nashik, Maharashtra",
      phone: "+91 — — — — — —",
      hours: "8:00 AM - 11:00 PM",
      mapUrl: "https://goo.gl/maps/..."
    },
    {
      name: "Cafe Bliss — Gangapur Road",
      address: "Gangapur Road, Nashik, Maharashtra",
      phone: "+91 — — — — — —",
      hours: "7:00 AM - 10:00 PM",
      mapUrl: "https://goo.gl/maps/..."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl font-serif font-bold text-white mb-4">Our Locations</h1>
        <p className="text-slate-500 uppercase tracking-widest text-sm">Find Bliss Near You</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {locations.map((loc, idx) => (
          <motion.div 
            key={loc.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group"
          >
            <div className="h-64 bg-slate-800 relative overflow-hidden">
              <img 
                src={`https://images.unsplash.com/photo-1559925393-8be0ec41b507?auto=format&fit=crop&q=80&w=800&sig=${idx}`} 
                alt={loc.name}
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent"></div>
              <div className="absolute bottom-6 left-8">
                <h2 className="text-2xl font-serif font-bold text-white">{loc.name}</h2>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <p className="text-slate-400 text-sm">{loc.address}</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <p className="text-slate-400 text-sm">{loc.phone}</p>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <p className="text-slate-400 text-sm">{loc.hours}</p>
              </div>
              
              <div className="pt-6 border-t border-white/5 flex gap-4">
                <button className="flex-1 bg-primary hover:bg-primary-dark text-background-dark py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" /> Get Directions
                </button>
                <button className="p-3 border border-white/10 rounded-xl hover:bg-white/5 text-white transition-all">
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 rounded-3xl overflow-hidden h-[500px] border border-white/10 grayscale opacity-50">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119981.264150824!2d73.721478!3d19.997453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd90238dd7b573%3A0x7f1d625d6d744598!2sNashik%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
