import React from "react";
import { useLocation } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import ProductsSidebar from "../components/ProductsSidebar";

export default function ProductsMain() {
  const { search } = useLocation();
  const category = new URLSearchParams(search).get("category") || "all";

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 mt-40 md:mt-36">
      <div className="max-w-full mx-auto px-1 sm:px-4 lg:px-4">
        <h1 className="text-3xl font-bold text-center mb-2 capitalize text-amber-400 pt-2">
          {category === "all" ? "Wszystkie produkty" : category}
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Сайдбар */}
          <div className="md:w-1/4 lg:w-1/5">
            <div className="sticky top-28 text-black border border-amber-700 bg-amber-400 rounded-xl shadow-lg p-2">
              <ProductsSidebar />
            </div>
          </div>

          {/* Сітка продуктів */}
          <div className="flex-1">
            <ProductGrid category={category} />
          </div>
        </div>
      </div>
    </div>
  );
}
