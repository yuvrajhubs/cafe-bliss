import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, Clock } from 'lucide-react';

export default function Reservations() {
  const [formData, setFormData] = useState({
    date: '',
    time: '8:00 AM',
    guests: '2 Guests',
    requests: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <h1 className="text-5xl font-serif font-bold text-white mb-4">Reservation Received</h1>
          <p className="text-slate-400 mb-8">Thank you! We've received your request and will confirm shortly.</p>
          <button onClick={() => setIsSubmitted(false)} className="bg-primary text-background-dark px-8 py-3 rounded-full font-bold">Make Another</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-serif font-bold text-white mb-4">Reserve a Table</h1>
        <p className="text-slate-500 uppercase tracking-widest text-sm">Secure your spot at Cafe Bliss</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-sm"
      >
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-slate-500 font-bold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> Date
              </label>
              <input 
                type="date" 
                required
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-1 focus:ring-primary/50 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-slate-500 font-bold flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" /> Time
              </label>
              <select 
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-1 focus:ring-primary/50 outline-none transition-all appearance-none"
              >
                <option className="bg-background-dark">8:00 AM</option>
                <option className="bg-background-dark">10:00 AM</option>
                <option className="bg-background-dark">12:00 PM</option>
                <option className="bg-background-dark">2:00 PM</option>
                <option className="bg-background-dark">4:00 PM</option>
                <option className="bg-background-dark">6:00 PM</option>
                <option className="bg-background-dark">8:00 PM</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-slate-500 font-bold flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" /> Guests
            </label>
            <select 
              value={formData.guests}
              onChange={(e) => setFormData({...formData, guests: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-1 focus:ring-primary/50 outline-none transition-all appearance-none"
            >
              <option className="bg-background-dark">1 Guest</option>
              <option className="bg-background-dark">2 Guests</option>
              <option className="bg-background-dark">3 Guests</option>
              <option className="bg-background-dark">4 Guests</option>
              <option className="bg-background-dark">5+ Guests</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Special Requests</label>
            <textarea 
              rows={4}
              value={formData.requests}
              onChange={(e) => setFormData({...formData, requests: e.target.value})}
              placeholder="Any dietary requirements or special occasions?"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-1 focus:ring-primary/50 outline-none transition-all resize-none"
            ></textarea>
          </div>

          <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-background-dark py-5 rounded-xl font-bold text-lg transition-all transform active:scale-[0.98] shadow-xl shadow-primary/10">
            Confirm Reservation
          </button>
        </form>
      </motion.div>

      
      <p className="text-center text-slate-500 text-sm mt-8">
        For groups larger than 10, please contact us directly at <span className="text-primary">+91 — — — — — —</span>
      </p>
    </div>
  );
}
