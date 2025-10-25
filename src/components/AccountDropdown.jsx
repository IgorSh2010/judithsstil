import { useState, useRef, useEffect } from "react";
import { me } from "../api/user";
import {
  User,
  ShoppingBag,
  MessageSquare,
  //Settings,
  LogOut,
  LayoutDashboard,
  BarChart3,
  Package,
  Tag,
  Image,
  Users,
  DollarSign,
} from "lucide-react";

export default function AccountDropdown({ logout }) {
  const [open, setOpen] = useState(false);
  const [userMe, setUserMe] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await me();
        setUserMe(res.user);
      } catch (err) {
        console.error("Error fetching userMe in Dropdown:", err);
      }
    })();
  }, []);

  const menuRef = useRef(null);
  // Закриття меню при кліку поза межами
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!userMe) return <div className="mt-1">Ładowanie menu...</div>;

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-black border border-amber-600 bg-amber-400 rounded px-3 py-1 hover:bg-amber-500 transition"
      >
        <User className="w-5 h-5" />
        <span>Moje konto</span>
        <span className="text-sm text-black hidden md:inline border-l border-gray-900 pl-2">
          {userMe ? `Witaj, ${userMe.username}` : ""}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-xl shadow-xl z-50 animate-fadeIn">
          <div className="py-2">
            {/* --- Користувацькі сторінки --- */}
            <DropdownItem href="/profile" icon={<User color="gold"/>}>Dane konta</DropdownItem>
            <DropdownItem href="/orders" icon={<ShoppingBag color="gold"/>}>Moje zamówienia</DropdownItem>
            <DropdownItem href="/chat" icon={<MessageSquare color="gold"/>}>Czaty zamówień</DropdownItem>

            {/* --- Для адміністратора --- */}
            {userMe?.role === "admin" && (
              <>
                <div className="border-t border-gray-200 my-2" />
                <span className="block px-4 text-xs text-gray-400 uppercase">CMS</span>
                <DropdownItem href="/admin/products" icon={<Package color="gold"/>}>Produkty</DropdownItem>
                <DropdownItem href="/admin/prices" icon={<Tag color="gold"/>}>Ceny</DropdownItem>
                <DropdownItem href="/admin/settings" icon={<Image color="gold"/>}>Baner główny i logo</DropdownItem>

                {/* <div className="border-t border-gray-200 my-2" />
                <span className="block px-4 text-xs text-gray-400 uppercase">Raporty</span>
                <DropdownItem href="/admin/purchases" icon={<LayoutDashboard color="gold"/>}>Zakupy</DropdownItem>
                <DropdownItem href="/admin/sales" icon={<BarChart3 color="gold"/>}>Sprzedaż</DropdownItem>
                <DropdownItem href="/admin/customers" icon={<Users color="gold"/>}>Klienci</DropdownItem>
                <DropdownItem href="/admin/costs" icon={<DollarSign color="gold"/>}>Koszt własny</DropdownItem> */}
              </>
            )}

            <div className="border-t border-gray-200 my-2" />
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 flex items-center gap-2 text-red-600 hover:bg-gray-100 transition"
            >
              <LogOut className="w-4 h-4" />
              Wyloguj
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Маленький допоміжний компонент для пунктів меню
function DropdownItem({ href, icon, children }) {
  return (
    <a
      href={href}
      className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 transition text-gray-800"
    >
      <span className="w-4 h-4 text-gray-500">{icon}</span>
      {children}
    </a>
  );
}
