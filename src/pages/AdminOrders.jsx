import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminOrder, getOrderStatuses, updateOrderStatus } from "../api/user";
import { formatPrice, formatDate } from "../utils/formats";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [updatedStatus, setUpdatedStatus] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      const [statuses, orders] = await Promise.all([getOrderStatuses(), getAdminOrder()]);
      setOrders(orders);
      setStatuses(statuses);
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status_id) => {
    setUpdatedStatus((prev) => ({ ...prev, [id]: status_id }));
  };

  const saveStatusChange = async (id) => {
    const newStatus = updatedStatus[id];
    if (!newStatus) return;
    await updateOrderStatus(id, newStatus);
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, status_id: newStatus } : o
      )
    );
  };

  const getRowColor = (code) => {
    switch (code?.toLowerCase()) {
      case "paid":
        return "bg-gradient-to-r from-green-900/40 to-emerald-800/30";
      case "shipped":
        return "bg-gradient-to-r from-blue-900/40 to-sky-800/30";
      case "delivered":
        return "bg-gradient-to-r from-amber-900/40 to-yellow-800/30";
      case "canceled":
        return "bg-gradient-to-r from-red-900/40 to-rose-800/30";
      default:
        return "bg-gray-900/40";
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 pt-36 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gold mb-8 border-b border-gray-700 pb-3">
          Zamówienia
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-gray-300">
            <thead>
              <tr className="bg-gray-900/50 text-gray-400 uppercase text-sm tracking-wide">
                <th className="py-3 px-4 text-left w-11">
                  <div>ID</div>
                </th>
                <th className="py-3 px-4 text-left">Klient</th>
                <th className="py-3 px-4 text-left">Suma</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Płatność</th>
                <th className="py-3 px-4 text-left">Data zamówienia</th>
                <th className="py-3 px-4 text-left"></th>
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
                  <td className="py-3 px-4">
                    <div className="text-gold font-medium">{o.id}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-gray-200 font-medium">{o.username}</div>
                    <div className="text-gray-500 text-sm italic">{o.email}</div>
                    <div className="text-gray-500 text-sm italic">{o.phone}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-200 font-semibold">{formatPrice(o.total_price)}</td>
                  <td className="py-3 px-4">
                      <select
                        value={updatedStatus[o.id] || o.status_id}
                        onChange={(e) =>
                          handleStatusChange(o.id, Number(e.target.value))
                        }
                        className="bg-gray-900 text-gray-200 border border-gray-700 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                      >
                        {statuses.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  <td className="py-3 px-4">
                    <div className="text-gray-300 uppercase font-medium">{o.payment_method}</div>
                    <div className="text-gray-500 text-sm italic">Data płatności: {formatDate(o.payment_date)}</div>
                    <div className="text-gray-500 text-xs italic">ID transakcji: {o.payment_external_id}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-gray-200 font-medium">{formatDate(o.order_date)}</div> 
                    <div className="text-gray-500 text-sm italic">(zaktualizowane: {formatDate(o.order_updated_at)})</div>
                  </td>
                  <td className="py-3 px-4">
                    {/* Можна додати кнопки дій: np. podgląd, edytuj */}
                    <div className="flex flex-col gap-2">
                    
                    <Link
                      to={`/admin/orders/${o.id}`}
                      className="text-sm text-center text-amber-400 hover:text-gold font-medium transition"
                    >
                      Szczegóły
                    </Link>
                    </div>
                  </td>
                </tr>
                );
              })}

              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-500">
                    Brak zamówień do wyświetlenia
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
