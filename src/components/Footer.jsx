import { Mail, PhoneCall } from "lucide-react"
import FooterBadge from "./FooterBadge";

export default function Footer(){
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 text-gray-200">
      <div className="grid max-w-7xl mx-auto px-4 py-2 md:grid-cols-4 gap-6">
        <div>
            <img src="/logo2.png" alt="Logo" className="h-25" />
        </div>
        <div>            
          <h4 className="font-semibold mb-2">Judiths stil</h4>
          <p className="text-sm text-gray-400">Polska produkcja • Kontakt • FAQ</p>
        </div>
        <div>
          <h5 className="font-semibold underline mb-2">Kolekcje</h5>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>Bestsellery</li>
            <li>Wyprzedaż</li>
            <li>Vouchery</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold underline mb-2">Kontakt</h5>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5" /> <p className="text-sm text-gray-400">judiths.stil@gmail.com</p>
          </div>
          <div className="flex items-center gap-2">
            <PhoneCall className="h-5 w-5" /> <p className="text-sm text-gray-400">732-490-953</p>
          </div>
          <div className="font-semibold underline my-3 text-sm text-gray-200">
            <p className="ml-2"> Social media links</p>
            <div className="flex justify-start items-center gap-4">
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
      </div>
      <div className="border-t border-gray-800 text-sm text-gray-500 pt-1 text-base-content max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex-1 text-center ">
          ©{new Date().getFullYear()} Judiths stil. Wszelkie prawa zastrzeżone.
        </div>
        <div className="flex ml-auto">
          <FooterBadge />
        </div>
      </div>
          </footer>
  )
}
