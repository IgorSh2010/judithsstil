import { useEffect, useState } from "react";
import Toast from "../components/Toast";
import { motion, AnimatePresence } from "framer-motion";
import AddProduct from "../components/AddProduct";
import ProductCard from "../components/ProductCardCMS";
import { getProducts } from "../api/products";

export default function ProductsCMS() {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

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

  const handleDeleteProduct = (deletedId) => {
  setProducts((prev) => prev.filter((p) => p.id !== deletedId));

  setToast({ show: true, message: "✅ Produkt został usunięty!", type: "success" });

  // ⏳ Автоматично закривається через 2 секунди
  setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-10 max-w-6xl mx-auto mt-36 mb-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Zarządzanie produktami</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`px-6 py-2 rounded-lg text-white font-medium transition-all duration-300 ${
            showForm
              ? "bg-gray-500 hover:bg-gray-600"
              : "bg-amber-500 hover:bg-amber-600"
          }`}
        >
          {showForm ? "Anuluj" : "Dodaj produkt"}
        </button>
      </div>

      {/* Анімація розгортання/згортання */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            key="form"
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <AddProduct onProductAdded={fetchProducts} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Вивід товарів */}
      {loading ? (
        <div className="text-center text-gray-600 mt-8 animate-pulse">
          Ładowanie produktów...
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
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
                >
                  <ProductCard product={p} onDeleted={handleDeleteProduct}/>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              Brak produktów w bazie
            </p>
          )}
        </motion.div>
      )}

      <Toast show={toast.show} message={toast.message} type={toast.type} />
      
    </div>
  );
}