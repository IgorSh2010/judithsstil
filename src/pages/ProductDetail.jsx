import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { createPortal } from "react-dom";
import { getProductByID } from "../api/public";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductByID(id);
        console.log("✅ product:", data);
        setProduct(data);
      } catch (err) {
        console.error("❌ Błąd pobierania produktu:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-3xl mt-36 mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Produkt nie znaleziony</h2>
        <Link to="/" className="text-[#d4af37] hover:underline">
          Powrót do strony głównej
        </Link>
      </div>
    );
  }

  const images = product.images?.length ? product.images : ["/placeholder.jpg"];
  const sizes = product.sizes || ["One Size"];
  const Available = product.is_available;

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  const handleDragEnd = (_, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) nextImage();
    else if (info.offset.x > swipeThreshold) prevImage();
  };

  return (
    <div className="mt-36 mb-3 max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 text-gray-100 bg-[#0f0f0f] rounded-2xl border border-gray-800 shadow-lg">
      {/* Фото */}
      <div className="relative bg-[#141414] rounded-xl overflow-hidden flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[currentImage]}
            src={images[currentImage]}
            alt={product.name}
            onClick={() => setIsFullscreen(true)}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="object-cover w-full h-full rounded-lg cursor-zoom-in"
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                prevImage();
              }}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-[#d4af37] p-2 rounded-full transition"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                nextImage();
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-[#d4af37] p-2 rounded-full transition"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      {/* Опис */}
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-[#d4af37] mb-3">{product.name}</h1>
        <p className="text-gray-400 text-sm mb-1">{product.category}</p>
        <div className="text-2xl font-bold mb-4 text-[#d4af37]">{product.price} zł</div>

        <span
          className={`inline-block mb-5 text-xs font-medium px-3 py-1 rounded-full border ${
            Available
              ? "bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37]"
              : "bg-rose-900/30 border-rose-700 text-rose-400"
          }`}
        >
          {Available ? "Dostępny" : "Niedostępny"}
        </span>

        <p className="text-gray-300 mb-8 leading-relaxed">
          {product.description ||
            "Opis produktu wkrótce dostępny. Wyjątkowa jakość i polska produkcja."}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {sizes.map((size) => (
            <span
              key={size}
              className="px-3 py-1 text-sm rounded-md bg-gray-800 text-gray-200 border border-gray-700 hover:border-[#d4af37] hover:text-[#d4af37] transition-all"
            >
              {size}
            </span>
          ))}
        </div>

        <button className="px-6 py-3 bg-[#d4af37] text-black rounded-lg font-semibold hover:bg-[#e6c34d] transition-all">
          Dodaj do koszyka
        </button>

        <Link
          to="/productsMain"
          className="mt-6 inline-block text-sm text-gray-400 hover:text-[#d4af37] transition-all"
        >
          ← Wróć do listy produktów
        </Link>
      </div>

      {/* Thumbnail previews */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 py-3 bg-[#141414] col-span-2 rounded-xl">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`w-12 h-12 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                idx === currentImage
                  ? "border-[#d4af37] opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX */}
      {isFullscreen &&
        createPortal(
          <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
            <AnimatePresence mode="wait">
              <motion.img
                key={images[currentImage]}
                src={images[currentImage]}
                alt={product.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="max-w-5xl max-h-[90vh] object-contain select-none"
              />
            </AnimatePresence>

            {/* Close button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition"
            >
              <X size={24} />
            </button>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-6 text-[#d4af37] hover:text-white transition"
                >
                  <ChevronLeft size={40} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-6 text-[#d4af37] hover:text-white transition"
                >
                  <ChevronRight size={40} />
                </button>
              </>
            )}
          </div>,
          document.body
        )}
    </div>
  );
}