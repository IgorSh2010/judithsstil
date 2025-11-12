import { useEffect, useState } from "react";
import { getAdminOrder } from "../api/user";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await getAdminOrder();
      setOrders(orders);
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    /* await axios.put(`/api/admin/orders/${id}/status`, { status });
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    ); */
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 py-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gold mb-8 border-b border-gray-700 pb-3">
          Zamówienia
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-gray-300">
            <thead>
              <tr className="bg-gray-900/50 text-gray-400 uppercase text-sm tracking-wide">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Użytkownik</th>
                <th className="py-3 px-4 text-left">Suma</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Metoda płatności</th>
                <th className="py-3 px-4 text-left">Działania</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-gray-800 hover:bg-gray-900/60 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-gold">{o.id}</td>
                  <td className="py-3 px-4 text-gray-300">{o.email}</td>
                  <td className="py-3 px-4 text-gray-200 font-semibold">{o.total} zł</td>
                  <td className="py-3 px-4">
                    <select
                      value={o.status}
                      onChange={(e) => handleStatusChange(o.id, e.target.value)}
                      className="bg-gray-900 text-gray-200 border border-gray-700 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                    >
                      <option value="pending">Oczekuje</option>
                      <option value="paid">Opłacono</option>
                      <option value="shipped">Wysłano</option>
                      <option value="delivered">Dostarczono</option>
                      <option value="canceled">Anulowano</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    {o.payment_method || "—"}
                  </td>
                  <td className="py-3 px-4">
                    {/* Можна додати кнопки дій: np. podgląd, edytuj */}
                    <button className="text-sm text-amber-400 hover:text-gold font-medium transition">
                      Szczegóły
                    </button>
                  </td>
                </tr>
              ))}
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
