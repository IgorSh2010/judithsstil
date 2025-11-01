import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../api/public";

export default function ProductsDropdown() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.rows);
      } catch (err) {
        console.error("Błąd pobierania kategorii:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="hover:underline my-1 gap-6 text-sm font-semibold uppercase"
      >
        Produkty
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-52 text-black bg-white border border-gray-200 rounded-xl shadow-xl animate-fadeIn">
          <ul className="py-1">
            <li>
              <Link
                to={`/ProductsMain?category=all`}
                className="block px-4 py-2 hover:bg-gray-100 text-sm"
                onClick={() => setOpen(false)}
              >
                Wszystkie produkty
              </Link>
            </li>
            <hr className="my-1 border-gray-100" />
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/ProductsMain?category=${cat.slug}`}
                  className="block px-4 py-2 hover:bg-gray-100 text-sm capitalize"
                  onClick={() => setOpen(false)}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}