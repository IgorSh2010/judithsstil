import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <article className="border rounded-lg overflow-hidden hover:shadow-lg transition">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-[4/5] bg-gray-100 flex items-center justify-center">
          <img src={product.image} alt={product.name} className="max-h-full" />
        </div>
        <div className="p-3">
          <h3 className="text-sm font-medium">{product.name}</h3>
          <p className="text-xs text-gray-500">{product.category}</p>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-sm font-semibold">{product.price} zł</div>
            <span className="text-xs px-2 py-1 border rounded">Zobacz</span>
          </div>
        </div>
      </Link>
    </article>
  )
}
