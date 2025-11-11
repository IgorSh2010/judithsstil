import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CategorySelect({ value, onChange, available, setAvailable }) {
  const [show, setShow] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef(null);

  const filtered = (available || [])
                .filter((cat) => typeof cat === "string")
                .filter((cat) => cat.toLowerCase().includes((value || "").toLowerCase()));
  console.log("available categories:", value)

  const handleKeyDown = (e) => {
    if (!show && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setShow(true);
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        setHighlightIndex((prev) =>
          prev < filtered.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        setHighlightIndex((prev) =>
          prev > 0 ? prev - 1 : filtered.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightIndex >= 0 && filtered[highlightIndex]) {
          onChange(filtered[highlightIndex]);
          setShow(false);
          inputRef.current.blur();
        } else if (
          value &&
          !available.map((c) => c.toLowerCase()).includes(value.toLowerCase())
        ) {
          setAvailable((prev) => [...prev, value]);
          setShow(false);
        }
        break;
      case "Escape":
        setShow(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value || ""}
        onChange={(e) => {
          onChange(e.target.value);
          setHighlightIndex(-1);
        }}
        onFocus={() => setShow(true)}
        onBlur={() => setTimeout(() => setShow(false), 150)}
        onKeyDown={handleKeyDown}
        placeholder="Wpisz lub wybierz kategorię..."
        className="w-full bg-gray-900 text-gray-100 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-[#d4af37]"
      />

      <AnimatePresence>
        {show && (
          <motion.ul
            key="dropdown"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute z-[9999] mt-1 w-full bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg max-h-44 overflow-y-auto shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
          >
            {filtered.map((cat, index) => (
              <li
                key={cat}
                onMouseDown={() => {
                  onChange(cat);
                  setShow(false);
                }}
                className={`px-3 py-2 text-sm cursor-pointer ${
                  index === highlightIndex
                    ? "bg-[#d4af37]/30 text-[#d4af37]"
                    : "text-gray-200 hover:bg-[#d4af37]/20"
                }`}
              >
                {cat}
              </li>
            ))}

            {/* Якщо введена категорія нова */}
            {value &&
              !available
                .map((c) => c.toLowerCase())
                .includes(value.toLowerCase()) && (
                <li
                  onMouseDown={() => {
                    setAvailable((prev) => [...prev, value]);
                    setShow(false);
                  }}
                  className="px-3 py-2 text-sm text-[#d4af37] hover:bg-[#d4af37]/10 cursor-pointer"
                >
                  ➕ Dodaj „{value}”
                </li>
              )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
