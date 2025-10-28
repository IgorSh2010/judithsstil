import { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import Toast from "./ui/Toast";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle, Trash2} from "lucide-react";
import { isAvailable, delProduct } from "../api/products";

export default function ProductCardCMS({ product, onToggleAvailability, onDelete }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [Available, setIsAvailable] = useState(product.is_available);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const images = product.images || [];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  //Swipe gesture: якщо тягнемо ліворуч чи праворуч
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50; // мінімальна відстань пікселів для свайпу
    if (info.offset.x < -swipeThreshold) {
      nextImage();
    } else if (info.offset.x > swipeThreshold) {
      prevImage();
    }
  };

  // ✅ Зміна доступності
  const toggleAvailability = async () => {
  try {
    //setLoading(true);
    const updated = !Available;

    // Припустимо, твоя API функція приймає (productId, newStatus)
    const res = await isAvailable(product.id, updated);

    // Якщо бекенд повертає оновлений продукт або просто { success: true }
    if (res.status === 200) {
      setIsAvailable(updated);
      if (onToggleAvailability) onToggleAvailability(product.id, updated);
    } else {
      throw new Error("Brak odpowiedzi z serwera");
    }
  } catch (err) {
    console.error("❌ Błąd zmiany dostępności:", err);
    setToast({ show: true, message: "❌ Błąd zmiany dostępności produktu.", type: "error" });
    // ⏳ Автоматично закривається через 2 секунди
    setTimeout(() => setToast({ show: false, message: "" }), 4000);
  } finally {
    //setLoading(false);
  }
};

// 🗑️ Видалення товару
  const deleteProduct = async () => {
    try {
      const res = await delProduct(product.id);

      if (res.messege !== "") {
        if (onDelete) onDelete(product.id);
        setTimeout(() => setShowConfirm(false), 400);
        setToast({ show: true, message: "✅ Produkt został usunięty!", type: "success" });
        // ⏳ Автоматично закривається через 2 секунди
        setTimeout(() => setToast({ show: false, message: "" }), 4000);
      } 
    } catch (err) {
      console.error("❌ Błąd usuwania produktu:", err);
      setToast({ show: true, message: "❌ Błąd usuwania produktu.", type: "error" });
      // ⏳ Автоматично закривається через 2 секунди
      setTimeout(() => setToast({ show: false, message: "" }), 4000);
    } finally {
      //setLoading(false);
    }
  };

  if (!product) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      
      <div className="relative h-64 w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[currentImage]}
            src={images[currentImage]}
            alt={product.name}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="object-cover w-full h-full"
          />
        </AnimatePresence>

        {/* Buttons for navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 p-2 rounded-full shadow-md transition"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 p-2 rounded-full shadow-md transition"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      <div className="p-4">
        <div className="flex gap-2 w-full justify-between">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h3>
          <span
              className={`text-sm px-2 py-1 rounded-md ${
                Available ? "bg-emerald-300 text-emerald-700" : "bg-rose-100 text-rose-700"
              }`}
            >
              {Available ? "Dostępny" : "Niedostępny"}
          </span>
        </div>  
        <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-emerald-600">
            {Number(product.price).toFixed(2)} zł
          </span>
        </div>

          {/* Кнопки керування */}
          <div className="mt-4 flex flex-col gap-3 w-full">
            {/* Ряд з двома кнопками */}
            <div className="flex gap-2 w-full">
              <button
                onClick={toggleAvailability}
                className={`flex-1 h-11 rounded-lg flex items-center justify-center gap-2 shadow transition ${
                  Available
                    ? "bg-indigo-600 hover:bg-indigo-800 text-white"
                    : "bg-gray-300 hover:bg-gray-400 text-gray-700"
                }`}
              >
                <CheckCircle size={24} className="relative left-2.5" />
                {Available ? "Wyłącz dostępność" : "Włącz dostępność"}
              </button>

              <button 
                onClick={() => setShowConfirm(true)}
                className="flex-1 h-11 bg-red-700 hover:bg-red-600 text-white rounded-lg shadow flex items-center justify-center transition">
                <Trash2 size={24} className="relative" />
                Usuń
              </button>
            </div>

            {/* Кнопка Szczegóły */}
            <Link
              to={`/admin/products/${product.id}/edit`}
              key={product}
                className="h-11 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow w-full flex items-center justify-center">
              Edytuj
            </Link>
          </div>
      </div>

      {/* Модалка підтвердження */}
      <ConfirmModal
        open={showConfirm}
        product={product}
        onConfirm={deleteProduct}
        onCancel={() => setShowConfirm(false)}

      />

      {/* Thumbnail previews */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 py-3 bg-gray-50">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`w-10 h-10 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                idx === currentImage ? "border-emerald-500" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </motion.div>
  );
}
