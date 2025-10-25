// src/components/Toast.jsx
import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ show, message, type = "success" }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4 }}
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm
            ${type === "success" ? "bg-emerald-600" : "bg-rose-600"}`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
