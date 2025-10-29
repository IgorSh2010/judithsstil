import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../api/public";

export default function ProductGrid({ category = "all" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(category); // ✅ передаємо категорію
        setProducts(data.data);
      } catch (err) {
        console.error("❌ Błąd pobierania produktów:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading)
    return (
      <div className="text-center text-gray-500 mt-10 animate-pulse">
        Ładowanie produktów...
      </div>
    );

  if (products.length === 0)
    return (
      <div className="text-center text-gray-400 mt-10">
        Brak produktów w tej kategorii
      </div>
    );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 m-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
