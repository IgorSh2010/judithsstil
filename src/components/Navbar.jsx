import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { me } from '../api/user';
import { logout } from '../api/auth';
import AccountDropdown from "./AccountDropdown";
import ProductsDropdown from './ProductsDropdown';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { getLogo } from '../api/public';
import { getPreviewImg } from '../utils/formats';

export default function Navbar() {
  const [logo, setLogo] = useState();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMe, setUserMe] = useState(null);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await me();
          setUserMe(res.user);
        } catch (err) {
          console.error(err);
        }
      }
    })();
  }, []);

  useEffect(() => {
    const fetchLogo = async () => {
      try { 
        const logoUrl = await getLogo();
        setLogo(getPreviewImg(logoUrl));
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };
    fetchLogo();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 
      ${isScrolled ? "bg-black/80 backdrop-blur-sm py-2" : "bg-gradient-to-b from-amber-700 to-orange-100 py-4"}`}>

      {/* Logo */}
      <Link to={`/`} className="mx-auto flex flex-col items-center transition-all duration-500">
        <div className="flex items-center space-x-4">
          <img
            src={logo}
            alt="logo"
            className={`w-auto transition-all rounded-2xl duration-500
            ${isScrolled ? "h-0" : "h-20"}`}
          />
        </div>
      </Link>

      {/* Desktop row */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 mt-2">

        {/* Desktop nav */}
        <nav className={`
          hidden md:flex gap-6 text-sm font-semibold uppercase tracking-wide transition-opacity duration-500 
          ${isScrolled ? "opacity-100 text-white" : "opacity-90 text-black"}
        `}>
          <a className="hover:underline my-1" href="/">Strona Główna</a>
          <ProductsDropdown />
          <a className="hover:underline my-1" href='/AboutUs'>O nas</a>

          {userMe ? (
            <AccountDropdown user={userMe} logout={logout}/>
          ) : (
            <a className="hover:underline my-1" href="/AuthPage">Login</a>
          )}
        </nav>

        {/* Search + cart */}
        <div className="flex w-full md:w-auto justify-between items-center md:gap-4">
          <input
            className="hidden md:block border rounded px-3 py-1 text-sm"
            placeholder="Szukaj..."
          /> 

          {/* Mobile menu toggle */}
          {userMe ? (
            <div className="md:hidden py-2">
              <AccountDropdown user={userMe} logout={logout} mobile/>
            </div>
          ) : (
            <a className={`block md:hidden py-2 ${isScrolled ? "text-white" : "text-black"}`} href="/AuthPage">Login</a>
          )}

          <button
            className={`md:hidden p-2 ${isScrolled ? "text-white" : "text-black"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24}/> : <Menu size={24} />}
          </button>

          <Link
            to="/CartPage"
            className="flex items-center gap-2 px-3 py-2 text-sm rounded text-white bg-gray-900 hover:bg-amber-400 hover:text-gray-900 transition"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Koszyk</span>
          </Link>       
        </div>        
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="md:hidden mt-3 px-4 pb-4 text-black bg-white/90 backdrop-blur rounded-b-xl shadow-lg">
          <a className="block py-2 border-b" href="/">Strona Główna</a>
          <ProductsDropdown mobile />
          <a className="block py-2 border-b" href='/AboutUs'>O nas</a>         

          <input
            className="w-full mt-3 border rounded px-3 py-2 text-sm"
            placeholder="Szukaj..."
          />
        </div>
      )}
    </header>
  );
}
