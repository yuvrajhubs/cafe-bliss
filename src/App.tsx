import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import About from './pages/About';
import Locations from './pages/Locations';
import OrderNow from './pages/OrderNow';
import Gallery from './pages/Gallery';
import Admin from './pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-background-dark text-slate-100 selection:bg-primary selection:text-background-dark">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/about" element={<About />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/order" element={<OrderNow />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

