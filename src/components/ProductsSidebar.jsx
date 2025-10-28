import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCategories } from "../api/public";

export default function ProductsSidebar() {
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Błąd pobierania kategorii:", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <aside className="border-r border-gray-200 pr-4">
      <h2 className="font-semibold mb-2 text-gray-800 text-sm uppercase tracking-wide">
        Kategorie
      </h2>
      <ul className="space-y-1 text-sm">
        <li
          onClick={() => setSearchParams({ category: "all" })}
          className={`cursor-pointer py-1.5 px-2 rounded-md ${
            activeCategory === "all"
              ? "bg-pink-100 text-pink-700 font-semibold"
              : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          Wszystkie produkty
        </li>
        {categories.map((cat) => (
          <li
            key={cat.id}
            onClick={() => setSearchParams({ category: cat.slug })}
            className={`cursor-pointer py-1.5 px-2 rounded-md capitalize ${
              activeCategory === cat.slug
                ? "bg-pink-100 text-pink-700 font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}