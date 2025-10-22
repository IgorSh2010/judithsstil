import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";

export default function ConfirmModal({ open, product, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-sm text-center relative"
        >
          {/* Close button */}
          <button
            onClick={onCancel}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            <X size={22} />
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-3">
            <AlertTriangle size={42} className="text-red-500" />
          </div>

          {/* Product preview */}
          {product?.images?.[0] && (
            <div className="flex justify-center mb-4">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-24 h-24 object-cover rounded-lg shadow-md"
              />
            </div>
          )}

          {/* Message */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Czy na pewno chcesz usunąć ten produkt?
          </h3>
          <p className="text-sm text-gray-500 mb-5 leading-snug">
            <span className="text-gray-700 font-medium">{product?.title}</span>
            <br />
            <span className="text-red-600 font-medium">Operacja nieodwracalna!</span>
          </p>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
            >
              Anuluj
            </button>
            <button
              onClick={() => {
                onConfirm();
              }}
              className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
            >
              Usuń
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
