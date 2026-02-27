import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function Menu() {
  const [menuData, setMenuData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => {
        // Group by category
        const grouped = data.reduce((acc: any, item: any) => {
          if (!acc[item.category]) acc[item.category] = [];
          acc[item.category].push(item);
          return acc;
        }, {});
        setMenuData(Object.entries(grouped).map(([category, items]) => ({ category, items })));
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl font-serif font-bold text-white mb-4">The Menu</h1>
        <p className="text-slate-500 uppercase tracking-widest text-sm">Crafted with Passion</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
        {menuData.map((cat: any, idx: number) => (
          <motion.div 
            key={cat.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <h2 className="text-2xl font-serif font-bold text-primary mb-8 border-b border-white/10 pb-4">{cat.category}</h2>
            <div className="space-y-8">
              {cat.items.map((item: any) => (
                <motion.div 
                  key={item.id} 
                  whileHover={{ x: 4 }}
                  className="group cursor-pointer"
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{item.name}</h3>
                    <span className="text-primary font-serif italic">{item.price}</span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

