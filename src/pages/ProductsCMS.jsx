import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddProduct from "../components/AddProduct";
import ProductCard from "../components/ProductCardCMS";
import { getProducts } from "../api/products";
import { PlusCircle, XCircle } from "lucide-react";

export default function ProductsCMS() {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="p-6 md:p-10 max-w-7xl mx-auto mt-28 mb-10 bg-[#0f0f0f] text-gray-200 rounded-2xl border border-gray-800 shadow-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-[#d4af37] tracking-wide">
          Zarządzanie produktami
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-all duration-300 border ${
            showForm
              ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
              : "bg-[#d4af37] border-[#d4af37] text-black hover:bg-[#e6c34d]"
          }`}
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
      </div>

      {/* Add product form */}
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

      {/* Products grid */}
      {loading ? (
        <div className="text-center text-gray-500 mt-10 animate-pulse">
          Ładowanie produktów...
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
          transition={{ duration: 0.3 }}
        >
          {products.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {products.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  //className="bg-[#141414] border border-gray-800 rounded-xl shadow-md hover:shadow-lg hover:border-[#d4af37]/60 transition-all p-4 flex flex-col justify-between"
                >
                  {/* Preview card */}
                  <ProductCard product={p} onDeleted={fetchProducts} />

                  {/* {/* Buttons 
                  <div className="flex justify-between items-center mt-3 border-t border-gray-800 pt-3">
                    <span className="text-sm text-gray-400">
                      ID: {p.id}
                    </span>
                    
                      className="px-3 py-1.5 text-sm bg-[#d4af37] text-black font-semibold rounded-lg hover:bg-[#e6c34d] transition-all"
                    >
                      ✏️ Edytuj
                    </Link>
                  </div> */}
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <p className="text-gray-400 col-span-full text-center mt-6">
              Brak produktów w bazie
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}