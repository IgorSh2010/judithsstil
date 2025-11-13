import { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import Toast from "./ui/Toast";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Trash2} from "lucide-react";
import { delProduct } from "../api/products";
import {formatPrice } from "../utils/formats";

export default function ProductCardCMS({ product, onToggleAvailability, onDelete }) {
  const [currentImage, setCurrentImage] = useState(0);  
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const images = product.images?.length ? product.images : ["/no_image.png"];
  const Available = product.is_available;

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
        <div className="grid grid-cols-[1fr_auto] gap-4 w-full items-start">
          {/* Ліва колонка */}
          <div>
            <h3 className="text-lg font-semibold text-black truncate">
              {product.title}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2 mt-1">
              {product.description}
            </p>
          </div>

          {/* Права колонка */}
          <div className="flex flex-col items-end gap-1">
            <span
              className={`text-sm px-3 py-1 rounded-md ${
                Available
                  ? "bg-emerald-300/20 text-emerald-700 border border-emerald-400/50"
                  : "bg-rose-300/20 text-rose-400 border border-rose-400/50"
              }`}
            >
              {Available ? "Dostępny" : "Niedostępny"}
            </span>
            {product.is_bestseller && (
              <span className="inline-block bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] text-sm font-semibold px-3 py-1 rounded-full">
                ⭐ Bestseller
              </span>
            )}
            {product.is_featured && (
              <span className="inline-block bg-orange-500/20 border border-orange-500 text-orange-400 text-sm font-semibold px-3 py-1 rounded-full">
                ✨ Polecany
              </span>
            )}            
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-emerald-600">
            {formatPrice(product.price)}
          </span>
        </div>

          {/* Кнопки керування */}
          <div className="mt-4 flex flex-col gap-3 w-full">
            {/* Ряд з двома кнопками */}
            <div className="flex gap-2 w-full">
              {/* Кнопка Szczegóły */}
              <Link
                to={`/admin/products/${product.id}/edit`}
                key={product}
                  className="flex-1 h-11 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow flex items-center justify-center transition">
                Edytuj
              </Link>

              <button 
                onClick={() => setShowConfirm(true)}
                className="flex-1 h-11 bg-red-700 hover:bg-red-600 text-white rounded-lg shadow flex items-center justify-center transition">
                <Trash2 size={24} className="relative" />
                Usuń
              </button>
            </div>

            
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
