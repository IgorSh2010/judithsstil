import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddProduct from "../components/AddProduct";
import ProductCard from "../components/ProductCardCMS";
import { getProducts } from "../api/products";
import { PlusCircle, XCircle, LayoutGrid, List } from "lucide-react";

export default function ProductsCMS() {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("❌ Błąd pobierania produktów:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto mt-28 sm:mt-32 mb-6 bg-[#0f0f0f] text-gray-200 rounded-2xl border border-gray-800 shadow-lg">      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">        
        <h1 className="text-2xl sm:text-3xl font-bold text-[#d4af37] tracking-wide w-full sm:w-auto text-center sm:text-left">
          Zarządzanie produktami
        </h1>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
          <button
            onClick={() => setShowForm(!showForm)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 border w-full sm:w-auto justify-center sm:justify-start
              ${showForm ?
                "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700" :
                "bg-[#d4af37] border-[#d4af37] text-black hover:bg-[#e6c34d]"}`}
          >
            {showForm ? (
              <>
                <XCircle size={18} />
                <span>Anuluj</span>
              </>
            ) : (
              <>
                <PlusCircle size={18} />
                <span>Dodaj produkt</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-lg border transition
                ${view === "grid" ?
                  "bg-[#d4af37] border-[#d4af37] text-black" :
                  "bg-gray-800 border-gray-700 text-gray-300"}`}
              title="Widok siatki"
            >
              <LayoutGrid size={18} />
            </button>

            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-lg border transition
                ${view === "list" ?
                  "bg-[#d4af37] border-[#d4af37] text-black" :
                  "bg-gray-800 border-gray-700 text-gray-300"}`}
              title="Widok listy"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            key="form"
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="mb-8 bg-gray-900 border border-gray-800 p-4 rounded-xl shadow-inner"
          >
            <AddProduct onProductAdded={fetchProducts} />
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="text-center text-gray-500 mt-10 animate-pulse">Ładowanie produktów...</div>
      ) : (
        <motion.div
          className={
            view === "grid"
              ? "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              : "flex flex-col gap-3"
          }
          layout
          transition={{ duration: 0.3 }}
        >
          {products.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {products.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`${view === "list" && i % 2 === 1 ? "bg-[#121212]" : ""}`}
                >
                  <ProductCard product={p} onDeleted={fetchProducts} view={view} />
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <p className="text-gray-400 col-span-full text-center mt-6">Brak produktów w bazie</p>
          )}
        </motion.div>
      )}
    </div>
  );
}