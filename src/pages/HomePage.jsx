import Hero from '../components/ui/Hero'
import ProductGrid from '../components/ProductGrid'

export default function HomePage() {
  return (
    <main className="flex-1 pt-32">
      <Hero />
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Rekomendowane</h2>
        <ProductGrid />
      </section>
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Bestsellery</h2>
        <ProductGrid />
      </section>
      <section className="bg-gray-900 text-gray-200 w-full">
        
      </section>
    </main>
  )
}
