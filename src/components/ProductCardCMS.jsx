import { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import Toast from "./ui/Toast";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { delProduct } from "../api/products";
import { formatPrice, getPreviewImg } from "../utils/formats";

export default function ProductCardCMS({ product, onDelete, view }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const images = product.images?.length ? product.images : ["/no_image.png"];
  const Available = product.is_available;
  const isList = view === "list";

  const nextImage = () =>
    setCurrentImage((p) => (p + 1) % images.length);
  const prevImage = () =>
    setCurrentImage((p) => (p - 1 + images.length) % images.length);

  const handleDragEnd = (_, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) nextImage();
    if (info.offset.x > swipeThreshold) prevImage();
  };

  const deleteProduct = async () => {
    try {
      const res = await delProduct(product.id);

      if (res.messege !== "") {
        if (onDelete) onDelete(product.id);
        setTimeout(() => setShowConfirm(false), 300);
        setToast({
          show: true,
          message: "✅ Produkt został usunięty!",
          type: "success",
        });

        setTimeout(
          () => setToast({ show: false, message: "" }),
          4000
        );
      }
    } catch (err) {
      console.error(err);
      setToast({
        show: true,
        message: "❌ Błąd usuwania produktu.",
        type: "error",
      });
      setTimeout(
        () => setToast({ show: false, message: "" }),
        4000
      );
    }
  };

  if (!product) return null;

  /* ---------------- LIST VIEW ---------------- */

  if (isList) {
    return (
      <div
        className="
          p-4 rounded-xl border border-gray-800 bg-[#141414]
          hover:bg-[#181818] transition-colors
          flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4
        "
      >
        {/* Left */}
        <div className="flex gap-3 items-start sm:items-center">
          <img
            src={getPreviewImg(images[0])}
            alt={product.title}
            loading="lazy"
            className="w-20 h-20 rounded-lg object-cover border border-gray-700 shrink-0"
          />

          <div className="flex flex-col">
            <span className="font-semibold text-base sm:text-lg text-gray-200">
              {product.title}
            </span>

            <p className="text-gray-400 text-sm line-clamp-2 mt-1">
              {product.description}
            </p>

            <span className="text-xs text-gray-500 mt-1">
              {product.category}
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4">
          <div className="flex flex-col items-start sm:items-end gap-1 text-sm">
            <span
              className={`px-3 py-1 rounded-full ${
                Available
                  ? "bg-emerald-500/20 text-emerald-700 border border-emerald-400/50"
                  : "bg-rose-300/20 text-rose-400 border border-rose-400/50"
              }`}
            >
              {Available ? "Dostępny" : "Niedostępny"}
            </span>

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
          </div>

          <span className="font-semibold text-lg text-[#d4af37] whitespace-nowrap">
            {product.price} zł
          </span>

          <Link
            to={`/admin/products/${product.id}/edit`}
            className="
              px-3 py-1 rounded-lg text-sm bg-amber-600/20 text-amber-400 
              border border-amber-700/40 hover:bg-amber-600/30 transition
            "
          >
            Edytuj
          </Link>

          <button
            onClick={() => setShowConfirm(true)}
            className="
              px-3 py-1 rounded-lg text-sm bg-red-600/20 text-red-400 
              border border-red-700/40 hover:bg-red-600/30 transition
            "
          >
            Usuń
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- CARD VIEW ---------------- */

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="
        bg-white shadow-md rounded-2xl border border-gray-100 
        overflow-hidden hover:shadow-xl transition-all
      "
    >
      {/* Image */}
      <div className="relative w-full h-56 sm:h-64 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[currentImage]}
            loading="lazy"
            src={getPreviewImg(images[currentImage])}
            alt={product.title}
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

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="
                absolute left-2 top-1/2 -translate-y-1/2
                bg-white/70 p-2 rounded-full shadow transition
              "
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={nextImage}
              className="
                absolute right-2 top-1/2 -translate-y-1/2
                bg-white/70 p-2 rounded-full shadow transition
              "
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="grid grid-cols-[1fr_auto] gap-4 items-start">
          <div>
            <h3 className="text-lg font-semibold text-black truncate">
              {product.title}
            </h3>

            <p className="text-gray-500 text-sm line-clamp-2 mt-1">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1 text-sm">
            <span
              className={`px-3 py-1 rounded-md ${
                Available
                  ? "bg-emerald-300/20 text-emerald-700 border border-emerald-400/50"
                  : "bg-rose-300/20 text-rose-400 border border-rose-400/50"
              }`}
            >
              {Available ? "Dostępny" : "Niedostępny"}
            </span>

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
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-emerald-600">
            {formatPrice(product.price)}
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <Link
            to={`/admin/products/${product.id}/edit`}
            className="
              w-full h-11 bg-emerald-500 hover:bg-emerald-600 
              text-white rounded-lg flex items-center justify-center
              transition font-medium
            "
          >
            Edytuj
          </Link>

          <button
            onClick={() => setShowConfirm(true)}
            className="
              w-full h-11 bg-red-700 hover:bg-red-600
              text-white rounded-lg flex items-center justify-center
              transition font-medium
            "
          >
            <Trash2 size={22} className="mr-2" />
            Usuń
          </button>
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex justify-center gap-2 py-3 bg-gray-50">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`
                w-10 h-10 rounded-md overflow-hidden border-2 transition 
                ${idx === currentImage
                  ? "border-emerald-500"
                  : "border-transparent opacity-60 hover:opacity-100"}
              `}
            >
              <img
                src={getPreviewImg(img)}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <ConfirmModal
        open={showConfirm}
        product={product}
        onConfirm={deleteProduct}
        onCancel={() => setShowConfirm(false)}
      />

      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </motion.div>
  );
}
