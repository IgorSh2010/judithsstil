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
      setBestsellers(all.data.items.filter(p => p.is_bestseller))
      setFeatured(all.data.items.filter(p => p.is_featured))
    }
    fetchProducts()
  }, [])

  return (
    <main className="flex-1 pt-32 bg-[#0f0f0f] text-gray-200">
      <Hero />
      <ProductCarousel title="Rekomendowane" products={featured} />
      <ProductCarousel title="Bestsellery" products={bestsellers} />
    </main>
  )
}
