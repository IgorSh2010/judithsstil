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
        setCategories(data.rows);
      } catch (err) {
        console.error("Błąd pobierania kategorii:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (slug) => {
    setSearchParams({ category: slug });
  };

  return (
    <aside>
      <h2 className="font-semibold mb-3 text-black text-sm uppercase tracking-wider">
        Kategorie
      </h2>

      <ul className="space-y-1.5">
        {/* Wszystkie produkty */}
        <li
          onClick={() => handleCategoryClick("all")}
          className={`text-black cursor-pointer px-3 py-1 rounded-md transition-all duration-200 ease-in-out
            ${
              activeCategory === "all"
                ? "bg-amber-200 font-semibold shadow-sm"
                : "hover:bg-amber-200 text-black"
            }`}
        >
          Wszystkie produkty
        </li>

        {/* Dynamiczne kategorie */}
        {categories.map((cat) => (
          <li
            key={cat.id}
            onClick={() => handleCategoryClick(cat.slug)}
            className={`cursor-pointer px-3 py-1 rounded-md capitalize transition-all duration-200 ease-in-out
              ${
                activeCategory === cat.slug
                  ? "bg-amber-200 font-semibold shadow-sm"
                : "hover:bg-amber-200 text-black"
              }`}
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}
