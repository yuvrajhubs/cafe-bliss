import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function Gallery() {
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => setImages(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl font-serif font-bold text-white mb-4">Gallery</h1>
        <p className="text-slate-500 uppercase tracking-widest text-sm">Moments of Bliss</p>
      </motion.div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((img, idx) => (
          <motion.div 
            key={img.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="rounded-3xl overflow-hidden border border-white/10 group relative"
          >
            <img 
              src={img.url} 
              alt={img.alt} 
              className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
              <p className="text-white font-serif italic">{img.alt}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
