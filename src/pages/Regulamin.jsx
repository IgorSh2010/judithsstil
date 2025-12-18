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
            1. Postanowienia ogólne
          </h2>
          <p className="text-gray-300 mb-2">
            1.1. Niniejszy Regulamin określa zasady korzystania ze sklepu internetowego prowadzonego pod adresem
             https://judithsstil.vercel.app przez [nazwa firmy], NIP: [NIP], REGON: [REGON], z siedzibą [adres].
          </p>
          <p className="text-gray-300 mb-2">
            1.2. Regulamin skierowany jest do Konsumentów i Przedsiębiorców dokonujących zakupów w Sklepie. 
          </p>
          <p className="text-gray-300 mb-2">
            1.3. Warunkiem złożenia zamówienia jest akceptacja Regulaminu.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3" style={{ color: "#d4af37" }}>
            2. Definicje
          </h2>
          <p className="text-gray-300 mb-2">
              • Sklep – sklep internetowy prowadzony przez Sprzedawcę.
          </p>
          <p className="text-gray-300 mb-2">    
              • Sprzedawca – [nazwa firmy], jako przedsiębiorca zarejestrowany w Polsce.
          </p>
          <p className="text-gray-300 mb-2">
              • Klient – osoba fizyczna, osoba prawna lub jednostka organizacyjna dokonująca zakupu.
          </p>
          <p className="text-gray-300 mb-2">
              • Konsument – osoba fizyczna dokonująca zakupu w celach niezwiązanych bezpośrednio z działalnością gospodarczą.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3" style={{ color: "#d4af37" }}>
            3. Informacje o produktach
          </h2>
          <p className="text-gray-300 mb-2">
            3.1. Sklep prowadzi sprzedaż odzieży i akcesoriów modowych.
          </p>
          <p className="text-gray-300 mb-2">
            3.2. Ceny podane na stronie są cenami brutto (z VAT).
          </p>
          <p className="text-gray-300 mb-2">
            3.3. Zdjęcia produktów mają charakter poglądowy — kolory mogą różnić się od rzeczywistych.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3" style={{ color: "#d4af37" }}>
            4. Składanie zamówień
          </h2>
          <p className="text-gray-300 mb-2">
            4.1. Zamówienia można składać 24/7 poprzez stronę internetową Sklepu.
          </p>
          <p className="text-gray-300 mb-2">
            4.2. Klient składa zamówienie, wybierając produkt, rozmiar, kolor i dodając go do koszyka.
          </p>
          <p className="text-gray-300 mb-2">
            4.3. Po złożeniu zamówienia Klient otrzymuje potwierdzenie na adres e-mail.
          </p>
          <p className="text-gray-300 mb-2">
            4.4. Umowę uważa się za zawartą w momencie potwierdzenia zamówienia przez Sprzedawcę.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3" style={{ color: "#d4af37" }}>
            5. Płatności
          </h2>
          <p className="text-gray-300 mb-2">
            5.1. Sklep udostępnia m.in. następujące formy płatności:
              <p className="text-gray-300 ml-5 mb-2">
                • szybkie płatności online (np. Przelewy24, PayU, Stripe),
              </p>
              <p className="text-gray-300 ml-5 mb-2">
                • przelew tradycyjny,
              </p>
              <p className="text-gray-300 ml-5 mb-2">
                • płatność za pobraniem (jeśli dostępna).
              </p>
          </p>
          <p className="text-gray-300 mb-2">
            5.2. Termin płatności przy przelewie tradycyjnym wynosi 3 dni robocze.
          </p>
          <p className="text-gray-300 mb-2">
            5.3. Brak zapłaty może skutkować anulowaniem zamówienia.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3" style={{ color: "#d4af37" }}>
            6. Dostawa
          </h2>
          <p className="text-gray-300 mb-2">
            6.1. Sklep realizuje dostawy na terenie Polski (a także UE, jeśli Klient terytorialnie znajduje się poza granicami Polski i na terytorium UE).
          </p>
          <p className="text-gray-300 mb-2">
            6.2. Koszty dostawy podawane są podczas składania zamówienia.
          </p>
          <p className="text-gray-300 mb-2">
            6.3. Czas realizacji zamówienia wynosi zwykle 1–3 dni robocze od momentu zaksięgowania płatności.
          </p>
          <p className="text-gray-300 mb-2">
            6.4. W przypadku wyboru płatności przy odbiorze — zamówienie realizowane jest niezwłocznie.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3" style={{ color: "#d4af37" }}>
            7. Odstąpienie od umowy (zwroty)
          </h2>
          <p className="text-gray-300 mb-2">
            7.1. Konsument ma prawo odstąpić od umowy w ciągu 14 dni od otrzymania produktu.
          </p>
          <p className="text-gray-300 mb-2">
            7.2. Aby dokonać zwrotu, Konsument powinien złożyć oświadczenie o odstąpieniu (np. przez komunikację na stronie Sklepu w rozdziale "Moje wiadomości" albo mailowo).
          </p>
          <p className="text-gray-300 mb-2">
            7.3. Produkt nie powinien nosić śladów użytkowania ponad konieczne do stwierdzenia charakteru i właściwości.
          </p>
          <p className="text-gray-300 mb-2">
            7.4. Konsument odsyła produkt na własny koszt, chyba że Sklep postanowi inaczej.
          </p>
          <p className="text-gray-300 mb-2">
            7.5. Zwrot środków następuje w ciągu 14 dni od otrzymania zwracanego produktu.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3" style={{ color: "#d4af37" }}>
            8. Reklamacje (rękojmia)
          </h2>
          <p className="text-gray-300 mb-2">
            8.1. Sprzedawca odpowiada wobec Konsumenta za wady fizyczne i prawne produktu zgodnie z Kodeksem Cywilnym.
          </p>
          <p className="text-gray-300 mb-2">
            8.2. Reklamację można zgłosić mailowo lub pisemnie, opisując wadę.
          </p>
          <p className="text-gray-300 mb-2">
            8.3. Reklamacja zostanie rozpatrzona w ciągu 14 dni.
          </p>
          <p className="text-gray-300 mb-2">
            8.4. W przypadku uznania reklamacji Klient ma prawo do:
              <p className="text-gray-300 ml-5 mb-2">
                • naprawy produktu,
              </p> 
              <p className="text-gray-300 ml-5 mb-2"> 
                • wymiany,
              </p> 
              <p className="text-gray-300 ml-5 mb-2"> 
                • obniżenia ceny,
              </p>  
              <p className="text-gray-300 ml-5 mb-2">
                • odstąpienia od umowy (jeśli wada jest istotna).
              </p>
          </p>          
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3" style={{ color: "#d4af37" }}>
            9. Dane osobowe
          </h2>
          <p className="text-gray-300 mb-2">
            9.1. Administratorem danych osobowych jest [nazwa firmy].
          </p>
          <p className="text-gray-300 mb-2">
            9.2. Dane przetwarzane są zgodnie z RODO w celu realizacji zamówień.
          </p>
          <p className="text-gray-300 mb-2">
            9.3. Klient ma prawo dostępu, poprawiania i żądania usunięcia danych.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3" style={{ color: "#d4af37" }}>
            10. Postanowienia końcowe
          </h2>
          <p className="text-gray-300 mb-2">
            10.1. Regulamin może ulec zmianie – o każdej zmianie Klient zostaje poinformowany.
          </p>
          <p className="text-gray-300 mb-2">
            10.2. W sprawach nieuregulowanych zastosowanie mają przepisy prawa polskiego.
          </p>
          <p className="text-gray-300 mb-2">
            10.3. Regulamin obowiązuje od momentu opublikowania na stronie.
          </p>
        </section>
      </div>
    </main>
  );
}
