import Hero from '../components/ui/Hero'
import ProductCarousel from '../components/ui/ProductCarousel'
import { useEffect, useState } from 'react'
import { getProducts } from '../api/public'

export default function HomePage() {
  const [bestsellers, setBestsellers] = useState([])
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const all = await getProducts()
      console.log("all---", all)
      setBestsellers(all.data.filter(p => p.is_bestseller))
      setFeatured(all.data.filter(p => p.is_featured))
    }
    fetchProducts()
  }, [])

  return (
    <main className="flex-1 pt-32 bg-[#0f0f0f] text-gray-200">
      <Hero />
      <ProductCarousel title="Rekomendowane" products={featured} />
      <ProductCarousel title="Bestsellery" products={bestsellers} />
      {/* <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Rekomendowane</h2>
        <ProductGrid />
      </section>
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Bestsellery</h2>
        <ProductGrid />
      </section>
      <section className="bg-gray-900 text-gray-200 w-full">
        
      </section> */}
    </main>
  )
}
