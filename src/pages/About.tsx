import { motion } from 'motion/react';
import { Coffee, Heart, Leaf, Users } from 'lucide-react';

export default function About() {
  const values = [
    { icon: Coffee, title: "Artisanal Roasts", desc: "We source only the highest quality single-origin beans, roasted in small batches to preserve their unique flavor profiles." },
    { icon: Heart, title: "Curated Experience", desc: "Every detail of Cafe Bliss, from the lighting to the playlist, is designed to create a sanctuary of calm and connection." },
    { icon: Leaf, title: "Sustainable Sourcing", desc: "We partner with local Nashik farmers and ethical global suppliers to ensure our footprint is as light as our foam." },
    { icon: Users, title: "Community Hub", desc: "More than just a cafe, we are a gathering place for the dreamers, doers, and coffee lovers of Nashik." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Our Story</span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">Crafting Bliss in <br /><span className="text-primary italic">Every Cup.</span></h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-8 font-light">
            Founded in the heart of Nashik, Cafe Bliss was born from a simple desire: to elevate the coffee culture of our city. We saw a need for a space that combined minimalist luxury with the warmth of a neighborhood hangout.
          </p>
          <p className="text-slate-400 text-lg leading-relaxed font-light">
            Today, we are proud to be Nashik's premium destination for coffee enthusiasts. Our baristas are artists, our beans are treasures, and our guests are family. Welcome to the Bliss experience.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl overflow-hidden border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1000" 
              alt="Barista at work" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 bg-primary p-10 rounded-3xl hidden md:block">
            <p className="text-background-dark font-serif text-4xl font-bold">5+</p>
            <p className="text-background-dark/70 text-sm uppercase tracking-widest font-bold">Years of Bliss</p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((value, idx) => (
          <motion.div 
            key={value.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + idx * 0.1 }}
            className="bg-white/5 border border-white/10 p-10 rounded-3xl hover:border-primary/30 transition-all"
          >
            <value.icon className="w-10 h-10 text-primary mb-6" />
            <h3 className="text-xl font-serif font-bold text-white mb-4">{value.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{value.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
