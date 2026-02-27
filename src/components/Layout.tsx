import { Search, Coffee, Instagram, Twitter } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

export const Navbar = () => (
  <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/5 px-6 md:px-20 py-6 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
    <div className="flex items-center gap-12">
      <Link to="/" className="flex items-center gap-2">
        <div className="text-primary">
          <Coffee className="w-8 h-8" />
        </div>
        <h2 className="text-white text-2xl font-serif tracking-tight">Cafe Bliss</h2>
      </Link>
      <nav className="hidden md:flex items-center gap-8">
        {[
          { name: 'Menu', path: '/menu' },
          { name: 'Gallery', path: '/gallery' },
          { name: 'Reservations', path: '/reservations' },
          { name: 'About', path: '/about' },
          { name: 'Locations', path: '/locations' }
        ].map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path}
            className={({ isActive }) => 
              `text-sm font-medium tracking-wide transition-colors ${isActive ? 'text-primary' : 'text-slate-400 hover:text-primary'}`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
    <div className="flex items-center gap-6">
      <div className="hidden lg:block relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
        <input 
          className="w-64 pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm focus:ring-1 focus:ring-primary/50 transition-all outline-none text-white" 
          placeholder="Search menu..." 
          type="text"
        />
      </div>
      <Link to="/order" className="bg-primary hover:bg-primary-dark text-background-dark px-8 py-2.5 rounded-full text-sm font-bold transition-all transform active:scale-95">
        Order Now
      </Link>
    </div>
  </header>
);

export const Footer = () => (
  <footer className="bg-black border-t border-white/5 py-16 px-6 md:px-20">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
      <div className="flex flex-col items-center md:items-start gap-4">
        <div className="flex items-center gap-3">
          <Coffee className="w-8 h-8 text-primary" />
          <span className="font-serif text-2xl text-white">Cafe Bliss</span>
        </div>
        <p className="text-slate-500 text-sm max-w-xs text-center md:text-left">
          Experience Coffee. Elevated. Nashik's premium hangout destination.
        </p>
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-8 text-sm text-slate-400">
          <a className="hover:text-primary transition-colors" href="#"><Instagram className="w-5 h-5" /></a>
          <a className="hover:text-primary transition-colors" href="#"><Twitter className="w-5 h-5" /></a>
        </div>
        <div className="flex gap-8 text-xs uppercase tracking-widest text-slate-500">
          <Link className="hover:text-white transition-colors" to="/about">About</Link>
          <Link className="hover:text-white transition-colors" to="/menu">Menu</Link>
          <Link className="hover:text-white transition-colors" to="/locations">Contact</Link>
          <Link className="hover:text-white transition-colors" to="/admin">Admin</Link>
        </div>
      </div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600">
        © 2024 Cafe Bliss. All rights reserved.
      </p>
    </div>
  </footer>
);

