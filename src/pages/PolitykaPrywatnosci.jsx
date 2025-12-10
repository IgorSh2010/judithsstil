export default function PolitykaPrywatnosci() {
  return (
    <main className="min-h-screen bg-black text-gray-200 pt-44 px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8" style={{ color: "#d4af37" }}>
          Polityka prywatności
        </h1>

        <p className="mb-6 text-lg text-gray-300">
          Dbamy o prywatność naszych klientów. Dokument ten wyjaśnia zasady
          przetwarzania danych osobowych oraz wykorzystywania plików cookies.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3" style={{ color: "#d4af37" }}>
            1. Administrator danych
          </h2>
          <p className="text-gray-300">
            Administratorem danych jest właściciel sklepu. Dane są przetwarzane
            wyłącznie w celach związanych z realizacją zamówień oraz obsługą
            klienta.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3" style={{ color: "#d4af37" }}>
            2. Zakres przetwarzanych danych
          </h2>
          <p className="text-gray-300">
            Przetwarzamy dane takie jak: imię, nazwisko, adres e-mail, adres
            dostawy, numer telefonu oraz dane niezbędne do płatności.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3" style={{ color: "#d4af37" }}>
            3. Prawa użytkownika
          </h2>
          <p className="text-gray-300">
            Użytkownik ma prawo dostępu do swoich danych, ich sprostowania,
            usunięcia, ograniczenia przetwarzania oraz prawo do wniesienia
            sprzeciwu.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3" style={{ color: "#d4af37" }}>
            4. Pliki cookies
          </h2>
          <p className="text-gray-300">
            Sklep korzysta z plików cookies w celu poprawy jakości działania,
            zapewnienia personalizacji oraz analityki ruchu.
          </p>
        </section>
      </div>
    </main>
  );
}
