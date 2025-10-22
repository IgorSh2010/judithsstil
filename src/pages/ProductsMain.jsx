import React from 'react';
import ProductGrid from '../components/ProductGrid';   
import products from '../data/products'; // Zakładam, że masz plik z danymi produktów

export default
function ProductsMain() {
  return (
    <div className="min-h-screen bg-gray-100 pt-32">
      <h1 className="text-3xl font-bold text-center py-10">Produkty</h1>
      {/* Tutaj można dodać komponent ProductGrid z odpowiednimi produktami */}
        <ProductGrid products={products} />
    </div>
  );
}