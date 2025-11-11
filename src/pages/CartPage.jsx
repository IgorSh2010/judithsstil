import React from "react";
import { useCart } from "../contexts/CartActions";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { items, removeFromCart, clearCart, total } = useCart();

  if (items.length === 0)
    return (
      <>
        <div className="mt-36 min-h-[60vh] flex flex-col justify-center items-center text-center text-gray-400">
          <p className="text-xl mb-2">Twój koszyk jest pusty</p>
          <p className="text-sm text-gray-500">Dodaj produkty, aby kontynuować zakupy</p>
        

          <div className="mt-6 inline-block text-sm text-gray-400 hover:text-[#d4af37] transition-all">
            <Link
              to="/productsMain"
              className="mt-6 inline-block text-sm text-gray-400 hover:text-[#d4af37] transition-all"
            >
              ← Wróć do listy produktów
            </Link>
          </div>
        </div>
      </>
    );

  return (
    <div className="mt-36 min-h-screen bg-black text-gray-100 py-12 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold text-gold mb-8 border-b border-gray-700 pb-2">
          Twój koszyk
        </h1>

        <div className="space-y-6">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between bg-[#111] p-4 rounded-2xl shadow-md hover:shadow-lg hover:bg-[#1a1a1a] transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <motion.img
                    src={item.image_url}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-xl border border-gray-800"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  />
                  <div>
                    <p className="text-lg font-medium">{item.title}</p>
                    <p className="text-sm text-gray-400">
                      {item.quantity} × {item.price ? Number(item.price).toFixed(2) : "—"} zł
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-gray-400 hover:text-gold transition-colors"
                >
                  Usuń
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xl font-semibold">
            Razem: <span className="text-gold">{total.toFixed(2)} zł</span>
          </p>
          <div className="flex space-x-4">
            <button
              onClick={clearCart}
              className="px-5 py-2 border border-gray-700 rounded-xl text-gray-400 hover:bg-gray-800 transition-all"
            >
              Wyczyść
            </button>
            <button className="px-6 py-2 bg-gold text-black rounded-xl hover:bg-yellow-500 transition-all shadow-md">
              Przejdź do kasy
            </button>
          </div>
        </div>
        <Link
          to="/productsMain"
          className="mt-6 inline-block text-sm text-gray-400 hover:text-[#d4af37] transition-all"
        >
          ← Wróć do listy produktów
        </Link>
      </div>
    </div>
  );
}
