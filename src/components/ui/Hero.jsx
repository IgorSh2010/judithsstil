import { useEffect, useState} from 'react'
import { getBanner } from '../../api/public';

export default function Hero() {
  const [banner, setBanner] = useState();

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const bannerUrl = await getBanner();
        setBanner(bannerUrl);
      } catch (error) {
        console.error("Błąd pobierania banera:", error);
      }
    };

    fetchBanner();
  }, []);

  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
      {/* 🔹 Фонове зображення */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      ></div>

      {/* 🔹 Напівпрозорий затемнюючий шар (градієнт) */}
      {/*<div className="absolute inset-0 bg-black/50"></div>*/}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      
      {/* 🔹 Контент поверх банера */}
      <div className="relative z-10 max-w-2xl px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          Kolekcje Judith's Stil
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-100">
          Nowe wzory, polska produkcja — elegancja i komfort na co dzień.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-black/80 hover:bg-black text-white font-semibold rounded-lg transition">
            Zobacz kolekcję
          </button>
          <button className="px-8 py-3 bg-white/90 text-black font-semibold rounded-lg hover:bg-white transition">
            Wyprzedaż
          </button>
        </div>
      </div>
    </section>
  )
}
