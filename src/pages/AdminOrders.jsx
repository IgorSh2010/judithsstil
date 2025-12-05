import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminOrder, getOrderStatuses } from "../api/user";
import { formatPrice, formatDate } from "../utils/formats";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const [statuses, orders] = await Promise.all([getOrderStatuses(), getAdminOrder()]);
      setOrders(orders);
      setStatuses(statuses);
    };
    fetchOrders();
  }, []);

  const getRowColor = (code) => {
    switch (code?.toLowerCase()) {
      case "pending": return "bg-gradient-to-r from-purple-900/40 to-violet-800/30";
      case "awaiting_payment": return "bg-gradient-to-r from-amber-900/40 to-orange-800/30";
      case "paid": return "bg-gradient-to-r from-green-900/40 to-emerald-800/30";
      case "shipped": return "bg-gradient-to-r from-blue-900/40 to-sky-800/30";
      case "delivered": return "bg-gradient-to-r from-yellow-900/40 to-amber-800/30";
      case "completed": return "bg-gradient-to-r from-teal-900/40 to-cyan-800/30";
      case "cancelled": return "bg-gradient-to-r from-red-900/40 to-rose-800/30";
      default: return "bg-gray-900/40";
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 pt-44 md:pt-36 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gold mb-8 border-b border-gray-700 pb-3">
          Zamówienia
        </h1>

        {/* DESKTOP TABLE */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full table-auto border-collapse text-gray-300">
            <thead>
              <tr className="bg-amber-800 text-gray-100 uppercase text-sm tracking-wide">
                <th className="py-3 px-4 text-left w-11">ID</th>
                <th className="py-3 px-4 text-left">Klient</th>
                <th className="py-3 px-4 text-left">Suma</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Płatność</th>
                <th className="py-3 px-4 text-left">Data</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => {
                const currentStatus = statuses.find((s) => s.id === o.status_id);
                return (
                  <tr
                    key={o.id}
                    className={`${getRowColor(currentStatus?.code)} border-b border-gray-800 hover:brightness-110 transition`}
                  >
                    <td className="py-3 px-4 text-gold font-medium">{o.id}</td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{o.username}</div>
                      <div className="text-gray-500 text-sm italic">{o.email}</div>
                      <div className="text-gray-500 text-sm italic">{o.phone}</div>
                    </td>
                    <td className="py-3 px-4 font-semibold">{formatPrice(o.total_price)}</td>
                    <td className="py-3 px-4">{currentStatus?.label}</td>
                    <td className="py-3 px-4">
                      <div className="uppercase font-medium">{o.payment_method}</div>
                      <div className="text-gray-500 text-sm italic">
                        Data: {formatDate(o.payment_date)}
                      </div>
                      <div className="text-gray-500 text-xs italic">
                        ID: {o.payment_external_id}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{formatDate(o.order_date)}</div>
                      <div className="text-gray-500 text-sm italic">
                        (upd: {formatDate(o.order_updated_at)})
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        to={`/admin/orders/${o.id}`}
                        className="text-sm text-amber-400 hover:text-gold font-medium transition"
                      >
                        Szczegóły
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* MOBILE LIST VERSION */}
        <div className="md:hidden flex flex-col gap-4 mt-6">
          {orders.map((o) => {
            const currentStatus = statuses.find((s) => s.id === o.status_id);

            return (
              <div
                key={o.id}
                className={`${getRowColor(
                  currentStatus?.code
                )} rounded-xl p-4 border border-gray-800`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="text-gold text-xl font-bold">#{o.id}</div>
                  <Link
                    to={`/admin/orders/${o.id}`}
                    className="text-amber-400 hover:text-gold text-sm font-medium"
                  >
                    Szczegóły
                  </Link>
                </div>

                <div className="text-lg font-semibold mb-1">{o.username}</div>
                <div className="text-gray-500 text-sm">{o.email}</div>
                <div className="text-gray-500 text-sm mb-3">{o.phone}</div>

                <div className="text-gray-300 mb-2">
                  <span className="font-bold">Suma: </span>
                  {formatPrice(o.total_price)}
                </div>

                <div className="mb-2">
                  <span className="font-bold">Status: </span>
                  {currentStatus?.label}
                </div>

                <div className="mb-2">
                  <span className="font-bold">Płatność: </span>
                  {o.payment_method}
                </div>

                {o.payment_date && (
                  <div className="text-gray-400 text-sm italic mb-2">
                    Data płatności: {formatDate(o.payment_date)}
                  </div>
                )}

                <div className="text-gray-400 text-sm italic mb-2">
                  Data zamówienia: {formatDate(o.order_date)}
                </div>

                <div className="text-gray-500 text-xs italic">
                  Transakcja: {o.payment_external_id}
                </div>
              </div>
            );
          })}

          {orders.length === 0 && (
            <div className="py-6 text-center text-gray-500">
              Brak zamówień do wyświetlenia
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
