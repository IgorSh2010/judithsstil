import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../api/public";

export default function ProductGrid({ category = "all" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(category, page); // ✅ передаємо категорію
        setProducts(data.data.items);
        setTotalPages(data.data.totalPages);
      } catch (err) {
        console.error("❌ Błąd pobierania produktów:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, page]);

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
    <>
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 m-1">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>

    <div className="flex items-center justify-center gap-4 my-6 select-none">
      {/* Poprzednia */}
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className={`px-4 rounded-xl border transition-all 
                    ${
                      page === 1
                        ? "border-neutral-700 text-neutral-600 cursor-not-allowed"
                        : "border-amber-700/40 bg-neutral-900 text-amber-400 hover:bg-neutral-800 hover:border-amber-500"
                    }`}
      >
        Poprzednia
      </button>

      {/* Pagination indicator */}
      <span className="px-4 text-amber-400 font-medium bg-neutral-900 rounded-xl border border-amber-700/30 shadow-inner shadow-black/40">
        {page} <span className="text-neutral-500">/</span> {totalPages}
      </span>

      {/* Następna */}
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className={`px-4 rounded-xl border transition-all 
                    ${
                      page === totalPages
                        ? "border-neutral-700 text-neutral-600 cursor-not-allowed"
                        : "border-amber-700/40 bg-neutral-900 text-amber-400 hover:bg-neutral-800 hover:border-amber-500"
                    }`}
      >
        Następna
      </button>
    </div>
    </>
  );
}
