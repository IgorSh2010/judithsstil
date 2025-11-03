import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductCarousel({
  title = "Produkty",
  products = [],
  autoPlay = true,
  autoPlayDelay = 3000, // мс
  className = "",
}) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // ---- Автоматична прокрутка ----
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      if (!isHovered && containerRef.current) {
        containerRef.current.scrollBy({
          left: 300,
          behavior: "smooth",
        });

        // Якщо дійшли до кінця — повертаємось на початок
        const maxScroll =
          containerRef.current.scrollWidth - containerRef.current.clientWidth;
        if (containerRef.current.scrollLeft >= maxScroll - 10) {
          containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, autoPlayDelay);

    return () => clearInterval(interval);
  }, [isHovered, autoPlay, autoPlayDelay]);

  // ---- Swipe-жести ----
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startX = 0;
    let scrollLeft = 0;

    const onTouchStart = (e) => {
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const onTouchMove = (e) => {
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 1.3; // швидкість swipe
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener("touchstart", onTouchStart);
    container.addEventListener("touchmove", onTouchMove);

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  const scroll = (direction) => {
    if (!containerRef.current) return;
    const scrollAmount = 320;
    containerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      className={`relative max-w-7xl mx-auto px-4 py-10 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Заголовок + кнопки */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-100">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full bg-gray-800 hover:bg-[#d4af37]/20 transition"
          >
            <ChevronLeft className="text-[#d4af37]" size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full bg-gray-800 hover:bg-[#d4af37]/20 transition"
          >
            <ChevronRight className="text-[#d4af37]" size={20} />
          </button>
        </div>
      </div>

      {/* Карусель */}
      <motion.div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth select-none flex-col justify-between h-[380px] p-3"
      >
        {products.map((product) => (
          <Link to={`/product/${product.id}`}
                key={product.id}> 
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex-shrink-0 w-[220px] sm:w-[250px] md:w-[280px] lg:w-[300px] bg-gray-900 rounded-xl overflow-hidden border border-gray-700 active:scale-95 hover:shadow-lg"
          >
            <div className="relative">
              <img
                src={product.images?.[0]}
                alt={product.title}
                className="h-48 w-full object-cover"
              />
              {product.is_bestseller && (
                <span className="absolute top-2 left-2 bg-[#d4af37]/90 text-black text-xs font-semibold px-2 py-1 rounded">
                  ⭐ Bestseller
                </span>
              )}
              {product.is_featured && (
                <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  ✨ Polecany
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold truncate">
                {product.title}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-2">
                {product.description}
              </p>
              <p className="mt-2 text-[#d4af37] font-bold">{product.price} zł</p>
            </div>
          </motion.div>
        </Link>   
        ))}
      </motion.div>
    </section>
  );
}
