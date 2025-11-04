export default function AboutUs() {
  return (
    <div className="flex-1 pt-32"> 
        <h1 className="text-3xl font-bold text-center py-10">O nas</h1>
        <div className="max-w-4xl mx-auto px-4 text-gray-700">
            <p className="mb-4">
                Witamy w Judiths stil! Jesteśmy polską marką odzieżową, która łączy elegancję z komfortem na co dzień. 
                Nasze ubrania to hołd dla klasyki, wzbogacony o nowoczesne wzory i wysokiej jakości materiały.
            </p>
            <p className="mb-4">
                W Judiths stil wierzymy, że ubrania powinny nie tylko wyglądać dobrze, ale także sprawiać, że czujesz się wyjątkowo. 
                Dlatego każdy element naszej kolekcji został starannie zaprojektowany i wykonany z dbałością o najmniejsze detale.
            </p>
            <p className="mb-4">
                Nasza misja to dostarczanie odzieży, która podkreśla indywidualny styl i pozwala wyrazić siebie. 
                Niezależnie od tego, czy szukasz eleganckiej sukienki na specjalną okazję, czy wygodnych ubrań na co dzień, w Judiths stil znajdziesz coś dla siebie.
            </p>
            <p className="mb-4">
                Dziękujemy, że jesteś z nami i zapraszamy do odkrywania naszych kolekcji!
            </p>
        </div>
        <div className="justify-center items-center text-center bg-gray-100 mt-10 py-6">
            <p>
                Szukaj nas w social mediach! 

            </p>
            <div className="flex justify-center items-center gap-4 mt-2">
            <a
                href="https://www.facebook.com/104796724870917?ref=_xav_ig_profile_page_web"
                target="_blank"
                rel="noopener noreferrer">   
                <img src="/Facebook.png" alt="Facebook" title="Polub nas na Facebook" className="w-10 h-10" />
                </a>
                <a
                href="https://www.instagram.com/judiths_stil"
                target="_blank"
                rel="noopener noreferrer"
                >
                <img src="/Instagram.png" alt="Instagram" title="Śledź nas na Instagram" className="w-7 h-7" />
                </a>
                <a
                href="https://www.tiktok.com/@judiths_stil?_t=8qXVz9EhWEK&_r=1&fbclid=PAZXh0bgNhZW0CMTEAAad3AJ71nBJfxIMjbMd2WzV-MDf68uCcjg6GMI7HiQWqiPYUtOVy0liawuJCqg_aem_V8J-fTII0gtB4ERWo2TWOQ"
                target="_blank"
                rel="noopener noreferrer"
                >
                <img src="/TT.png" alt="Tiktok" title="Śledź nas na TikTok" className="w-7 h-7" />
                </a>
            </div>
        </div>
    </div>
  )
}

