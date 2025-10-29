import React from "react";
import { useLocation } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";

export default function ProductsMain() {
  const { search } = useLocation();
  const category = new URLSearchParams(search).get("category") || "all";

  return (
    <div className="min-h-screen bg-gray-100 pt-32">
      <h1 className="text-3xl font-bold text-center py-10 capitalize">
        {category === "all" ? "Wszystkie produkty" : category}
      </h1>

      <ProductGrid category={category} />
    </div>
  );
}
