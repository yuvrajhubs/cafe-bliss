import { motion } from 'motion/react';
import { useState } from 'react';
import { ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';

const items = [
  { name: "Bliss Signature Cold Brew", price: 8, desc: "24-hour slow-steeped single-origin." },
  { name: "Vanilla Bean Latte", price: 7, desc: "House-made Madagascar vanilla syrup." },
  { name: "Lavender Honey Matcha", price: 9, desc: "Ceremonial grade matcha with lavender." },
  { name: "Truffle Avocado Toast", price: 14, desc: "Smashed avocado with truffle oil." },
  { name: "Pistachio Rose Cake", price: 10, desc: "Light sponge with pistachio cream." }
];

export default function OrderNow() {
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const addToCart = (name: string) => {
    setCart(prev => ({ ...prev, [name]: (prev[name] || 0) + 1 }));
  };

  const removeFromCart = (name: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[name] > 1) {
        newCart[name] -= 1;
      } else {
        delete newCart[name];
      }
      return newCart;
    });
  };

  const subtotal = Object.entries(cart).reduce((acc: number, [name, qty]) => {
    const item = items.find(i => i.name === name);
    const price = item?.price || 0;
    return acc + (price * (qty as number));
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl font-serif font-bold text-white mb-4">Order Online</h1>
        <p className="text-slate-500 uppercase tracking-widest text-sm">Bliss Delivered to Your Door</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item, idx) => (
            <motion.div 
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ x: 4 }}
              className="flex items-center justify-between p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-primary/30 transition-all group"
            >
              <div className="flex-1">
                <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
                <p className="text-slate-500 text-sm mb-2">{item.desc}</p>
                <span className="text-primary font-serif italic">${item.price}</span>
              </div>
              <div className="flex items-center gap-4">
                {cart[item.name] ? (
                  <div className="flex items-center gap-4 bg-white/5 rounded-full p-2 border border-white/10">
                    <button 
                      onClick={() => removeFromCart(item.name)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-white font-bold w-4 text-center">{cart[item.name]}</span>
                    <button 
                      onClick={() => addToCart(item.name)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => addToCart(item.name)}
                    className="bg-primary hover:bg-primary-dark text-background-dark p-4 rounded-2xl transition-all transform active:scale-90"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:sticky lg:top-32 h-fit">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-md"
          >
            <div className="flex items-center gap-3 mb-8">
              <ShoppingBag className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-serif font-bold text-white">Your Order</h2>
            </div>

            {Object.keys(cart).length === 0 ? (
              <p className="text-slate-500 italic text-center py-10">Your cart is empty.</p>
            ) : (
              <div className="space-y-6 mb-10">
                {Object.entries(cart).map(([name, qty]) => {
                  const item = items.find(i => i.name === name);
                  return (
                    <div key={name} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-3">
                        <span className="text-primary font-bold">{qty}x</span>
                        <span className="text-slate-300">{name}</span>
                      </div>
                      <span className="text-white">${(item?.price || 0) * (qty as number)}</span>
                    </div>
                  );
                })}
                <div className="pt-6 border-t border-white/10 space-y-4">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Delivery</span>
                    <span>$2</span>
                  </div>
                  <div className="flex justify-between text-xl font-serif font-bold text-white pt-4">
                    <span>Total</span>
                    <span className="text-primary">${subtotal + (subtotal > 0 ? 2 : 0)}</span>
                  </div>
                </div>
              </div>
            )}

            <button 
              disabled={Object.keys(cart).length === 0}
              className="w-full bg-primary hover:bg-primary-dark disabled:bg-slate-800 disabled:text-slate-600 text-background-dark py-5 rounded-2xl font-bold text-lg transition-all transform active:scale-[0.98] shadow-xl shadow-primary/10"
            >
              Checkout
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
