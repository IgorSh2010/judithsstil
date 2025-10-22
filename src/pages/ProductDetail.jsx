import React from 'react'
import { useParams, Link } from 'react-router-dom'
import products from '../data/products'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Produkt nie znaleziony</h2>
        <Link to="/" className="text-accent hover:underline">Powrót do strony głównej</Link>
      </div>
    )
  }

  return (
    <div className="pt-40 max-w-5xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10">
      {/* Фото */}
      <div className="bg-gray-100 rounded-lg flex items-center justify-center p-4">
        <img src={product.image} alt={product.name} className="max-h-[500px]" />
      </div>

      {/* Опис */}
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-semibold mb-3">{product.name}</h1>
        <p className="text-gray-500 text-sm mb-2">{product.category}</p>
        <div className="text-2xl font-bold mb-6">{product.price} zł</div>

        <p className="text-gray-600 mb-8">
          {product.description || "Opis produktu wkrótce dostępny. Wyjątkowa jakość i polska produkcja."}
        </p>

        <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
          Dodaj do koszyka
        </button>

        <Link to="/productsMain" className="mt-6 inline-block text-sm text-gray-500 hover:underline">
          ← Wróć do listy produktów
        </Link>
      </div>
    </div>
  )
}
