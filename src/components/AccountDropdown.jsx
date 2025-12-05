import { useState, useRef, useEffect } from "react";
import { getStats } from "../api/user";
import {
  User,
  ShoppingBag,
  MessageSquare,
  LogOut,
  Package,
  Tag,
  Image,
} from "lucide-react";

export default function AccountDropdown({ logout, user }) {
  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState({ newMessages: 0, newOrders: 0 });

  const menuRef = useRef(null);

  // Закрити меню при кліку поза ним
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Періодичний опитувач статистики
  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getStats();
        if (Array.isArray(data) && data[0]) {
          setStats({
            newMessages: data[0].newMessages,
            newOrders: data[0].newOrders,
          });
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    loadStats();
    const interval = setInterval(loadStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const { newMessages, newOrders } = stats;

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-black border border-amber-600 bg-amber-400 rounded px-3 py-1 hover:bg-amber-500 transition"
      >
        <User className="w-5 h-5" />
        <span>Moje konto</span>
        <span className="text-sm hidden md:inline border-l border-gray-900 pl-2">
          Witaj, {user.username}
        </span>

        {(newMessages > 0 || newOrders > 0) && (
          <>
            <span className="absolute -right-2 -top-2 w-5 h-5 bg-red-500 rounded-full animate-ping opacity-60"></span>
            <span className="absolute -right-1 -top-1 w-3 h-3 bg-red-600 rounded-full"></span>
          </>
        )}
      </button>

      {/* Меню */}
      {open && (
        <div className="absolute left-0 mt-2 w-60 bg-white border border-gray-200 rounded-xl shadow-xl z-50 animate-fadeIn">
          <div className="py-2">

            <DropdownItem href="/profile" icon={<User color="gold" />}>
              Dane konta
            </DropdownItem>

            {/* Користувач */}
            {user.role === "user" && (
              <>
                <DropdownItem href="/ClientsOrders" icon={<ShoppingBag color="gold" />}>
                  Moje zamówienia
                </DropdownItem>

                <DropdownItem
                  href="/conversations"
                  icon={<MessageSquare color="gold" />}
                  highlight={newMessages}
                  badgeNumber={newMessages}
                >
                  Moje wiadomości
                </DropdownItem>
              </>
            )}

            {/* Адмін */}
            {user.role === "admin" && (
              <>
                <div className="border-t border-gray-200 my-2" />
                <span className="block px-4 text-xs text-gray-400 uppercase">CMS</span>

                <DropdownItem href="/admin/products" icon={<Package color="gold" />}>
                  Produkty
                </DropdownItem>

                <DropdownItem
                  href="/admin/orders"
                  icon={<Tag color="gold" />}
                  highlight={newOrders}
                  badgeNumber={newOrders}
                >
                  Zamówienia klientów
                </DropdownItem>

                <DropdownItem
                  href="/conversations"
                  icon={<MessageSquare color="gold" />}
                  highlight={newMessages}
                  badgeNumber={newMessages}
                >
                  Rozmowy z klientami
                </DropdownItem>

                <DropdownItem href="/admin/settings" icon={<Image color="gold" />}>
                  Baner główny i logo
                </DropdownItem>
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

// Компонент пункту меню
function DropdownItem({ href, icon, children, highlight, badgeNumber }) {
  return (
    <a
      href={href}
      className="relative px-4 py-2 flex items-center gap-2 hover:bg-gray-100 transition text-gray-800"
    >
      <span className="w-4 h-4 text-gray-500">{icon}</span>
      {children}

      {highlight > 0 && (
        <>
          <span className="absolute right-1 bottom-3 w-4 h-4 opacity-60 bg-red-500 rounded-full animate-ping"></span>
          <span className="absolute right-1 bottom-3 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
            {badgeNumber}
          </span>
        </>
      )}
    </a>
  );
}
