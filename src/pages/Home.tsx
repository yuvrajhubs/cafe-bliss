import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Coffee, Heart, Leaf, Star, QrCode, MapPin, Phone, Clock, ArrowRight } from 'lucide-react';

const Hero = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000" 
        alt="Cinematic Coffee" 
        className="w-full h-full object-cover opacity-60 scale-105"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 via-transparent to-background-dark"></div>
    </div>
    
    <div className="relative z-10 text-center px-6 max-w-4xl">
      <motion.span 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-primary font-medium tracking-[0.4em] uppercase text-sm mb-6 block"
      >
        Cafe Bliss — Nashik
      </motion.span>
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-6xl md:text-8xl font-serif font-bold text-white mb-8 leading-tight"
      >
        Experience Coffee. <br />
        <span className="italic text-primary">Elevated.</span>
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-slate-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light"
      >
        Nashik’s premium hangout destination for those who appreciate the finer details of life and coffee.
      </motion.p>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-6"
      >
        <Link to="/menu" className="bg-primary hover:bg-primary-dark text-background-dark px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105 w-full sm:w-auto">
          Explore Menu
        </Link>
        <Link to="/reservations" className="border border-white/20 hover:bg-white/10 text-white px-10 py-4 rounded-full font-bold transition-all w-full sm:w-auto backdrop-blur-sm">
          Reserve a Table
        </Link>
      </motion.div>
    </div>
    
    <motion.div 
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
    >
      <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent mx-auto"></div>
    </motion.div>
  </section>
);

const BrandStory = () => (
  <section className="py-32 px-6 bg-background-dark">
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-10">Crafted for Conversations.</h2>
        <div className="w-20 h-px bg-primary mx-auto mb-10"></div>
        <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-light italic">
          "At Cafe Bliss, we believe every cup tells a story. From the high-altitude single-origin beans to the curated ambiance of our Nashik space, we've designed an experience that invites you to slow down, connect, and savor the moment. Our community is built on the pillars of quality, warmth, and the simple joy of a perfect brew."
        </p>
      </motion.div>
    </div>
  </section>
);

const SignatureMenu = () => {
  const categories = [
    { title: 'Artisan Coffee', desc: 'Single-origin brews and classic espresso.', icon: Coffee },
    { title: 'Signature Beverages', desc: 'Unique blends crafted by our baristas.', icon: Heart },
    { title: 'Gourmet Bites', desc: 'Artisanal snacks and savory delights.', icon: Leaf },
    { title: 'Desserts', desc: 'Elegant pastries and sweet finishes.', icon: Star }
  ];

  return (
    <section className="py-32 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-serif font-bold text-white mb-4">Signature Selection</h2>
          <p className="text-slate-500 uppercase tracking-[0.2em] text-xs">A Taste of Bliss</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <motion.div 
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white/5 border border-white/10 p-10 rounded-3xl hover:border-primary/50 transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary transition-colors">
                <cat.icon className="w-8 h-8 text-primary group-hover:text-background-dark" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">{cat.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{cat.desc}</p>
              <div className="text-primary font-serif italic text-sm">Starting from $—</div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Link to="/menu" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
            View Full Menu <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const Experience = () => (
  <section className="py-32 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
      {[
        { title: 'Premium Ingredients', desc: 'Only the finest beans and freshest local produce.', icon: Leaf },
        { title: 'Cozy Ambience', desc: 'Minimalist luxury designed for comfort and focus.', icon: Coffee },
        { title: 'Community Vibes', desc: 'A hub for Nashik’s creative and professional minds.', icon: Heart }
      ].map((item, idx) => (
        <motion.div 
          key={item.title}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="text-center"
        >
          <div className="mb-8 inline-block">
            <item.icon className="w-12 h-12 text-primary/40" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-white mb-4">{item.title}</h3>
          <p className="text-slate-500 leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

const Gallery = () => {
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => setImages(data.slice(0, 4))); // Show first 4 on home
  }, []);

  return (
    <section className="py-32 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px]">
          {images.length > 0 ? (
            <>
              <div className="col-span-2 row-span-2 rounded-3xl overflow-hidden">
                <img src={images[0]?.url} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt={images[0]?.alt} referrerPolicy="no-referrer" />
              </div>
              <div className="rounded-3xl overflow-hidden">
                <img src={images[1]?.url} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt={images[1]?.alt} referrerPolicy="no-referrer" />
              </div>
              <div className="rounded-3xl overflow-hidden">
                <img src={images[2]?.url} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt={images[2]?.alt} referrerPolicy="no-referrer" />
              </div>
              <div className="col-span-2 rounded-3xl overflow-hidden">
                <img src={images[3]?.url} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt={images[3]?.alt} referrerPolicy="no-referrer" />
              </div>
            </>
          ) : (
            <div className="col-span-4 flex items-center justify-center text-slate-500">Loading gallery...</div>
          )}
        </div>
        <div className="text-center mt-12">
          <Link to="/gallery" className="text-primary font-bold hover:underline">View Full Gallery</Link>
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => (
  <section className="py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <div className="flex items-center justify-center gap-1 text-primary mb-4">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
        </div>
        <h2 className="text-4xl font-serif font-bold text-white mb-2">Loved by Nashik.</h2>
        <p className="text-slate-500 uppercase tracking-widest text-xs">4.7★ Rated in Nashik</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { name: "Rahul S.", text: "The best cold brew in Nashik. The minimalist vibe is exactly what the city needed." },
          { name: "Priya M.", text: "A perfect spot for my morning meetings. The service is as premium as the coffee." },
          { name: "Aniket K.", text: "Cafe Bliss has become my second home. The community here is amazing." }
        ].map((review, idx) => (
          <motion.div 
            key={review.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/5 p-8 rounded-3xl border border-white/10"
          >
            <p className="text-slate-300 italic mb-6">"{review.text}"</p>
            <p className="text-primary font-bold text-sm">— {review.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const SmartFeedback = () => (
  <section className="py-32 px-6 bg-primary/5">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-serif font-bold text-white mb-6">Your Experience Matters.</h2>
      <p className="text-slate-400 mb-12 max-w-xl mx-auto">We value your thoughts. Use our instant feedback system to let us know how we're doing.</p>
      
      <div className="bg-white p-8 rounded-3xl inline-block mb-10 shadow-2xl shadow-primary/20">
        <QrCode className="w-32 h-32 text-background-dark" />
      </div>
      
      <div>
        <button className="bg-primary hover:bg-primary-dark text-background-dark px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105">
          Scan & Review Us
        </button>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section className="py-32 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
      <div>
        <h2 className="text-4xl font-serif font-bold text-white mb-10">Visit Us.</h2>
        <div className="space-y-8">
          <div className="flex items-start gap-6">
            <MapPin className="w-6 h-6 text-primary shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">Address</h4>
              <p className="text-slate-400">Nashik, Maharashtra, India</p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <Phone className="w-6 h-6 text-primary shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">Phone</h4>
              <p className="text-slate-400">+91 — — — — — —</p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <Clock className="w-6 h-6 text-primary shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">Opening Hours</h4>
              <p className="text-slate-400">Mon — Sun: 8:00 AM - 11:00 PM</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rounded-3xl overflow-hidden h-[400px] border border-white/10 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
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
  </section>
);

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <BrandStory />
      <SignatureMenu />
      <Experience />
      <Gallery />
      <SocialProof />
      <SmartFeedback />
      <Contact />
    </div>
  );
}

