export default function Regulamin() {
  return (
    <main className="min-h-screen bg-black text-gray-200 pt-44 px-6 pb-20 rounded-t-3xl">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8" style={{ color: "#d4af37" }}>
          Regulamin sklepu
        </h1>

        <p className="mb-6 text-lg text-gray-300">
          Niniejszy regulamin określa zasady korzystania ze sklepu internetowego,
          w tym składania zamówień, realizacji dostaw oraz zasad odpowiedzialności.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3" style={{ color: "#d4af37" }}>
            1. Informacje ogólne
          </h2>
          <p className="text-gray-300">
            Sklep działa zgodnie z obowiązującymi przepisami prawa. Korzystając ze
            strony, użytkownik akceptuje warunki niniejszego regulaminu.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3" style={{ color: "#d4af37" }}>
            2. Składanie zamówień
          </h2>
          <p className="text-gray-300 mb-2">
            Zamówienia można składać przez 24 godziny na dobę, 7 dni w tygodniu.
          </p>
          <p className="text-gray-300">
            Klient zobowiązany jest do podania prawidłowych danych umożliwiających
            realizację zamówienia.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3" style={{ color: "#d4af37" }}>
            3. Płatności i dostawa
          </h2>
          <p className="text-gray-300">
            Dostępne metody płatności oraz opcje dostawy są prezentowane podczas
            składania zamówienia.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3" style={{ color: "#d4af37" }}>
            4. Reklamacje i zwroty
          </h2>
          <p className="text-gray-300">
            Klient ma prawo do reklamacji zgodnie z obowiązującymi przepisami.
            Procedura zwrotu jest opisana na stronie sklepu.
          </p>
        </section>
      </div>
    </main>
  );
}
