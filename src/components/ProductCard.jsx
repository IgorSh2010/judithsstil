import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from '../contexts/CartActions';
import { Button } from './ui/Button';
import Toast from "../components/ui/Toast"
import { formatPrice, getPreviewImg } from '../utils/formats';

export default function ProductCard({ product }) {
  const [currentImage, setCurrentImage] = useState(0);
  const { addToCart } = useCart();
  const Available = product.is_available;
  const images = product.images?.length ? product.images : ["/no_image.png"];
  const sizes = product.sizes || ["XS", "S", "M", "L", "XL", "ONESIZE"];
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) nextImage();
    else if (info.offset.x > swipeThreshold) prevImage();
  };

  const handleAddToCart = (e) => {
    e.preventDefault(); // не дає лінку спрацювати, якщо картка клікабельна
    addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      quatity: 1,
      image_url: product.images[0],
    });
    setToast({ show: true, message: `"${product.name}" dodano do koszyka!`, type: "success" });
    setTimeout(() => setToast({ show: false, message: "" }), 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-[#0f0f0f] text-gray-100 border border-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:border-[#d4af37]/40 transition-all flex flex-col h-full"
    >
      <Link to={`/product/${product.id}`} className="flex flex-col h-full">
        {/* 🖼 Зображення */}
        <div className="relative h-64 w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              loading="lazy"
              key={images[currentImage]}
              src={getPreviewImg(images[currentImage])}
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

          {/* навігація */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.preventDefault(); prevImage(); }}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/70 text-[#d4af37] p-2 rounded-full transition"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={(e) => { e.preventDefault(); nextImage(); }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/70 text-[#d4af37] p-2 rounded-full transition"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail previews */}
        {images.length > 1 && (
          <div className="flex justify-center rounded-sm gap-2 py-1 bg-gray-700">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.preventDefault(); setCurrentImage(idx)}}
                className={`w-10 h-10 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                  idx === currentImage ? "border-emerald-500" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img loading="lazy" src={getPreviewImg(img)} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* 💬 Контент */}
        <div className="flex flex-col flex-grow p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-[#d4af37] truncate">{product.name}</h3>
          </div>          
          <div className="flex justify-end items-center gap-2 mb-2">            
            {product.is_bestseller && (
              <span className="inline-block bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] text-xs font-semibold px-3 py-1 rounded-full">
                ⭐ Bestseller
              </span>
            )}
            {product.is_featured && (
              <span className="inline-block bg-orange-500/20 border border-orange-500 text-orange-400 text-xs font-semibold px-3 py-1 rounded-full">
                ✨ Polecany
              </span>
            )}
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full border ${
                Available
                  ? "bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37]"
                  : "bg-rose-900/30 border-rose-600 text-rose-400"
              }`}
            >
              {Available ? "Dostępny" : "Niedostępny"}
            </span>
          </div>

          <p className="text-sm text-gray-400 mb-3 line-clamp-2">{product.description}</p>

          {/* 📏 Розміри */}
          <div className="flex flex-wrap gap-1 mb-4">
            {sizes.map((size) => (
              <span
                key={size}
                className="px-2 py-1 text-xs rounded-md bg-gray-800 text-gray-300 hover:bg-[#d4af37]/20 hover:text-[#d4af37] border border-gray-700 hover:border-[#d4af37] cursor-pointer transition-all"
              >
                {size}
              </span>
            ))}
          </div>

          {/* 💰 Ціна */}
          <div className="text-xl font-bold text-[#d4af37] mb-3 mt-auto">
            {formatPrice(product.price)}
          </div>

          {/* 🛒 Кнопки */}
          <div className="flex flex-col sm:flex-row gap-2 mt-auto">
            <Button variant="secondary" className="w-full sm:w-1/2">
              Szczegóły
            </Button>
            <Button 
              variant="primary" className="w-full sm:w-1/2"
              onClick={handleAddToCart}>
              Dodaj do koszyka
            </Button>
          </div>
        </div>
      </Link>
    

      <Toast show={toast.show} message={toast.message} type={toast.type} />

    </motion.div>
  );
}
