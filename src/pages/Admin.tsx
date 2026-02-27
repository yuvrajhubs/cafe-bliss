import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Utensils, Calendar, Image as ImageIcon, Check, Trash2, Plus, LogOut } from 'lucide-react';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'menu' | 'reservations' | 'gallery'>('menu');
  
  const [menu, setMenu] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);

  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const fetchData = async () => {
    const [menuRes, resRes, galRes] = await Promise.all([
      fetch('/api/menu'),
      fetch('/api/reservations'),
      fetch('/api/gallery')
    ]);
    setMenu(await menuRes.json());
    setReservations(await resRes.json());
    setGallery(await galRes.json());
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success) {
      alert('Account created! Please login.');
      setIsLogin(true);
      setUsername('');
      setPassword('');
    } else {
      alert(data.message || 'Signup failed');
    }
  };

  const handleSaveMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingItem)
    });
    setEditingItem(null);
    fetchData();
  };

  const handleDeleteMenu = async (id: number) => {
    if (confirm('Are you sure?')) {
      await fetch(`/api/menu/${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  const handleConfirmReservation = async (id: number) => {
    await fetch(`/api/reservations/${id}/confirm`, { method: 'POST' });
    fetchData();
  };

  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingItem)
    });
    setEditingItem(null);
    fetchData();
  };

  const handleDeleteGallery = async (id: number) => {
    if (confirm('Are you sure?')) {
      await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-dark px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 p-10 rounded-3xl w-full max-w-md"
        >
          <h1 className="text-3xl font-serif font-bold text-white mb-8 text-center">
            {isLogin ? 'Admin Login' : 'Admin Sign Up'}
          </h1>
          <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-6">
            <div>
              <label className="text-xs uppercase tracking-widest text-slate-500 mb-2 block">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-slate-500 mb-2 block">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            <button className="w-full bg-primary text-background-dark font-bold py-4 rounded-xl hover:bg-primary-dark transition-all">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-slate-400 hover:text-primary transition-colors"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-dark text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <LayoutDashboard className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-serif font-bold">Admin Dashboard</h1>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>

        <div className="flex gap-4 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${activeTab === 'menu' ? 'bg-primary text-background-dark' : 'text-slate-400 hover:text-white'}`}
          >
            <Utensils className="w-4 h-4" /> Menu
          </button>
          <button 
            onClick={() => setActiveTab('reservations')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${activeTab === 'reservations' ? 'bg-primary text-background-dark' : 'text-slate-400 hover:text-white'}`}
          >
            <Calendar className="w-4 h-4" /> Reservations
          </button>
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${activeTab === 'gallery' ? 'bg-primary text-background-dark' : 'text-slate-400 hover:text-white'}`}
          >
            <ImageIcon className="w-4 h-4" /> Gallery
          </button>
        </div>

        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Manage Menu</h2>
              <button 
                onClick={() => setEditingItem({ category: '', name: '', price: '', desc: '' })}
                className="bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary hover:text-background-dark transition-all"
              >
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menu.map(item => (
                <div key={item.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="flex justify-between mb-4">
                    <span className="text-xs text-primary uppercase tracking-widest">{item.category}</span>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingItem(item)} className="text-slate-400 hover:text-white"><Plus className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteMenu(item.id)} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{item.desc}</p>
                  <span className="text-primary font-serif italic">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reservations' && (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-xs uppercase tracking-widest text-slate-400">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Guests</th>
                  <th className="px-6 py-4">Requests</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {reservations.map(res => (
                  <tr key={res.id} className="text-sm">
                    <td className="px-6 py-4">{res.date}</td>
                    <td className="px-6 py-4">{res.time}</td>
                    <td className="px-6 py-4">{res.guests}</td>
                    <td className="px-6 py-4 max-w-xs truncate">{res.requests || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${res.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {res.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {res.status !== 'confirmed' && (
                        <button 
                          onClick={() => handleConfirmReservation(res.id)}
                          className="text-primary hover:text-primary-dark flex items-center gap-1"
                        >
                          <Check className="w-4 h-4" /> Confirm
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Manage Gallery</h2>
              <button 
                onClick={() => setEditingItem({ url: '', alt: '' })}
                className="bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary hover:text-background-dark transition-all"
              >
                <Plus className="w-4 h-4" /> Add Image
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {gallery.map(img => (
                <div key={img.id} className="relative group rounded-2xl overflow-hidden aspect-square">
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
                    <button onClick={() => setEditingItem(img)} className="bg-white text-black p-2 rounded-full"><Plus className="w-4 h-4" /></button>
                    <button onClick={() => handleDeleteGallery(img.id)} className="bg-red-500 text-white p-2 rounded-full"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-background-dark border border-white/10 p-10 rounded-3xl w-full max-w-lg"
            >
              <h2 className="text-2xl font-serif font-bold mb-8">
                {editingItem.id ? 'Edit' : 'Add'} {activeTab === 'menu' ? 'Menu Item' : 'Gallery Image'}
              </h2>
              <form onSubmit={activeTab === 'menu' ? handleSaveMenu : handleSaveGallery} className="space-y-6">
                {activeTab === 'menu' ? (
                  <>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-slate-500 mb-2 block">Category</label>
                      <input 
                        type="text" 
                        value={editingItem.category}
                        onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-slate-500 mb-2 block">Name</label>
                      <input 
                        type="text" 
                        value={editingItem.name}
                        onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs uppercase tracking-widest text-slate-500 mb-2 block">Price</label>
                        <input 
                          type="text" 
                          value={editingItem.price}
                          onChange={(e) => setEditingItem({...editingItem, price: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-slate-500 mb-2 block">Description</label>
                      <textarea 
                        value={editingItem.desc}
                        onChange={(e) => setEditingItem({...editingItem, desc: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none resize-none"
                        rows={3}
                        required
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-slate-500 mb-2 block">Image URL</label>
                      <input 
                        type="text" 
                        value={editingItem.url}
                        onChange={(e) => setEditingItem({...editingItem, url: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-slate-500 mb-2 block">Alt Text</label>
                      <input 
                        type="text" 
                        value={editingItem.alt}
                        onChange={(e) => setEditingItem({...editingItem, alt: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                        required
                      />
                    </div>
                  </>
                )}
                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 bg-primary text-background-dark font-bold py-4 rounded-xl">Save Changes</button>
                  <button type="button" onClick={() => setEditingItem(null)} className="flex-1 bg-white/5 text-white font-bold py-4 rounded-xl">Cancel</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
