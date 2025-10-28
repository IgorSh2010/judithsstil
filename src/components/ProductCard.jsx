import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from './ui/Button';

export default function ProductCard({ product }) {
  const [currentImage, setCurrentImage] = useState(0);
  const Available = product.is_available;
  const images = product.images || ["/placeholder.jpg"];
  const sizes = product.sizes || ["XS", "S", "M", "L", "XL"];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) nextImage();
    else if (info.offset.x > swipeThreshold) prevImage();
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

        {/* 💬 Контент */}
        <div className="flex flex-col flex-grow p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-[#d4af37] truncate">{product.name}</h3>
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
            {product.price} zł
          </div>

          {/* 🛒 Кнопки */}
          <div className="flex flex-col sm:flex-row gap-2 mt-auto">
            <Button className="w-full sm:w-1/2 px-3 py-2 text-sm border bg-gray-900 text-gray-200 hover:bg-[#d4af37]/20 hover:text-[#d4af37] border-gray-700 hover:border-[#d4af37] rounded-lg transition-all">
              Szczegóły
            </Button>
            <Button className="w-full sm:w-1/2 px-3 py-2 text-sm bg-[#d4af37] text-black font-semibold rounded-lg hover:bg-[#e6c34d] transition-all">
              Dodaj do koszyka
            </Button>
          </div>
        </div>
      </Link>
      
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

    </motion.div>
  );
}
