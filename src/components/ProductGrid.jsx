import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { getProducts } from '../api/public'

export default function ProductGrid(){
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
        try {
          const data = await getProducts();
          setProducts(data);
          
        } catch (err) {
          console.error("❌ Błąd pobierania produktów:", err);
        }
      };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 m-4 ">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}
