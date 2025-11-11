import React, { createContext, useContext, useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { getCart, addCartItem, removeCartItem, clearCartAPI } from "../api/user"; // we'll define soon

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  //const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) fetchCart();
    else setItems([]); // no token → clear local
  }, [token]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const data = await getCart(token);
      setItems(data || []);
    } catch (err) {
      console.error("❌ Błąd pobierania koszyka:", err);
    } finally {
      setLoading(false);
    }
  };

  const requireAuth = () => {
    if (!token) {
      //navigate("/AuthPage", { state: { message: "Zaloguj się, aby korzystać z koszyka." } });
      window.location.href = "/";
      return false;
    }
    return true;
  };

  const addToCart = async (product) => {
    if (!requireAuth()) return;
    try {
      const updated = await addCartItem(token, product.id, 1);
      setItems(updated);
    } catch (err) {
      console.error("❌ Błąd dodawania do koszyka:", err);
    }
  };

  const removeFromCart = async (id) => {
    if (!requireAuth()) return;
    try {
      const updated = await removeCartItem(token, id);
      setItems(updated);
    } catch (err) {
      console.error("❌ Błąd usuwania z koszyka:", err);
    }
  };

  const clearCart = async () => {
    if (!requireAuth()) return;
    try {
      await clearCartAPI(token);
      setItems([]);
    } catch (err) {
      console.error("❌ Błąd czyszczenia koszyka:", err);
    }
  };

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total, loading }}>
      {children}
    </CartContext.Provider>
  );
};