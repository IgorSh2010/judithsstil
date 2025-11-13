import React, { createContext, useContext, useEffect, useState } from "react";
import { getCart, addCartItem, removeCartItem, clearCartAPI } from "../api/user";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return; // не викликаємо fetchCart, якщо користувач не авторизований
    }
    fetchCart();
  }, [token]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const data = await getCart();
      setTotal(data.amount || 0);
      setItems(data.items || []);
    } catch (err) {
      console.error("❌ Błąd pobierania koszyka:", err);
    } finally {
      setLoading(false);
    }
  };

  const requireAuth = () => {
    if (!token) {
      //navigate("/AuthPage", { state: { message: "Zaloguj się, aby korzystać z koszyka." } });
      window.location.href = "/AuthPage";
      return false;
    }
    return true;
  };

  const addToCart = async (product) => {
    if (!requireAuth()) return;
    try {
      await addCartItem(token, product.id, 1, product.price);
      await fetchCart();
    } catch (err) {
      console.error("❌ Błąd dodawania do koszyka:", err);
    }
  };

  const removeFromCart = async (id) => {
    if (!requireAuth()) return;
    try {
      await removeCartItem(token, id);
      await fetchCart();
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

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total, loading }}>
      {children}
    </CartContext.Provider>
  );
};