import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { me } from '../api/user';
import { logout } from '../api/auth';
import AccountDropdown from "./AccountDropdown";
import ProductsDropdown from './ProductsDropdown';
import { ShoppingBag } from 'lucide-react';
import { getLogo } from '../api/public';

export default function Navbar() {
    const [logo, setLogo] = useState();
    const [isScrolled, setIsScrolled] = useState(false);
    //const itemsInCart = 2
    const [userMe, setUserMe] = useState(null);

    useEffect(() => {
      (async () => {
        const token = localStorage.getItem("token");
        if (token) {
        try {          
          const res = await me(); 
          console.log(res.user);        
          setUserMe(res.user);
        } catch (err) {
          console.error(err);
        }
      }})();
    }, []);
    
    useEffect(() => {
        const fetchLogo = async () => {
            try { 
                const logoUrl = await getLogo();
                setLogo(logoUrl);
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

        {/* Лого та назва */}
        <Link to={`/`} className="mx-auto flex flex-col items-center transition-all duration-500">
          <div className="flex sm:flex-row items-center sm:space-x-4 ">
            <img src={logo} alt="logo" className={`w-auto transition-all rounded-2xl duration-500
                                                  ${isScrolled ? "h-0" : "h-20"}`}/>
          </div>
        </Link>
        
        {/* Навігація */}
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
            <nav className={`flex gap-6 text-sm font-semibold uppercase tracking-wide transition-opacity duration-500 
                            ${isScrolled ? "opacity-100 text-white" : "opacity-90 text-black"}`}>
                <a className="hover:underline my-1" href="/">Strona Główna</a>
                <ProductsDropdown />
                {/* <a className="hover:underline my-1" href='/ProductsMain'>Produkty</a> */}
                {/* <a className="hover:underline" href="#">Kolekcje</a> */}
                <a className="hover:underline my-1" href='/AboutUs'>O nas</a>
                
                {userMe ? (
                    <AccountDropdown user={userMe} logout={logout} />
                  )
                : (
                  <>
                    <a className="hover:underline my-1" href="/AuthPage">Login</a>
                  </>
                )}               
            </nav>

            <div className="flex items-center gap-4">
              <input className="hidden md:block border rounded px-3 py-1 text-sm" placeholder="Szukaj..." />
              <div className="relative cursor-pointer">
                <button className="flex items-center gap-2 px-3 py-2 text-sm rounded text-white bg-gray-900 hover:bg-amber-400 hover:text-gray-900 transition">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Koszyk</span>
                </button>

                {/* {itemsInCart > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-700 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {itemsInCart}
                  </span>
                )}  */}           
              </div>
            </div>
        </div>
    </header>
  )
}
