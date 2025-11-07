import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Package, CreditCard } from "lucide-react";
import { getClientOrder } from "../api/user";

const monthNamesPL = [
  "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
  "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
];

export default function ClientsOrders() {
  //const [orders, setOrders] = useState([]);
  const [groupedOrders, setGroupedOrders] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getClientOrder();
        const grouped = groupByMonth(data);
        setGroupedOrders(grouped);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const groupByMonth = (orders) => {
    return orders.reduce((acc, order) => {
      const date = new Date(order.created_at);
      const key = `${monthNamesPL[date.getMonth()]} ${date.getFullYear()}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(order);
      return acc;
    }, {});
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 px-6 mt-36">
      <h1 className="text-3xl font-semibold text-center mb-10 text-amber-400 pt-2">
        Moje zamówienia
      </h1>

      {Object.keys(groupedOrders).length === 0 ? (
          <p className="text-gray-400">Brak zamówień.</p>
        ) : (
          Object.entries(groupedOrders).map(([month, orders]) => (
            <div key={month} className="mb-10">
              <h2 className="text-2xl text-amber-500 mb-4 border-b border-amber-700/30 pb-2">
                {month}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 max-w-6xl mx-auto pb-3">

                {orders.map((order) => (
                  <motion.div
                    key={order.id}
                    whileHover={{ scale: 1.02 }}
                    className="h-full bg-neutral-900 border border-amber-700/30 rounded-2xl p-5 shadow-lg shadow-black/30 transition"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-amber-400">
                        <Package size={18} />
                        <span className="text-sm px-2 font-medium uppercase">
                          {order.status_label}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">
                        #{order.id.toString().padStart(5, "0")}
                      </span>
                    </div>

                    <div className="space-y-2 text-gray-300">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>
                          {new Date(order.created_at).toLocaleDateString("pl-PL")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard size={16} />
                        <span>{order.total_price} PLN</span>
                      </div>
                    </div>

                    <Link
                      to={`/clientsOrders/${order.id}`}
                      className="block mt-5 text-center bg-gradient-to-r from-amber-500 to-amber-700 text-black font-semibold py-2 rounded-xl hover:opacity-90 transition"
                    >
                      Szczegóły
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        )}
    </div>
  );
}