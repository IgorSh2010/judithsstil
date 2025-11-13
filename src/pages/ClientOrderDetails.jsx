import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Package, CreditCard, Clock } from "lucide-react";
import { getClientOrder } from "../api/user";
import { formatPrice } from "../utils/formats";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getClientOrder(id);
        console.log(data);
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order)
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-gray-300">
        Ładowanie...
      </div>
    );

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 px-6 py-3 mt-36">
      <div className="max-w-4xl mx-auto bg-neutral-900 border border-amber-700/30 rounded-3xl p-8 shadow-lg shadow-black/30">
        <Link
          to="/clientsOrders"
          className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition mb-6"
        >
          <ArrowLeft size={18} /> Powrót
        </Link>

        <h1 className="text-2xl font-semibold mb-6 text-amber-400">
          Zamówienie #{order.id.toString().padStart(5, "0")}
        </h1>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <Package size={18} /> <span>Status</span>
            </div>
            <p className="text-gray-300 capitalize">{order.status_label}</p>

            <div className="flex items-center gap-2 text-amber-400 mt-5 mb-2">
              <CreditCard size={18} /> <span>Płatność</span>
            </div>
            <p className="text-gray-300">
              {order.payment_status || "Oczekuje na opłatę"}
            </p>

            <div className="flex items-center gap-2 text-amber-400 mt-5 mb-2">
              <Clock size={18} /> <span>Data</span>
            </div>
            <p className="text-gray-300">
              {new Date(order.created_at).toLocaleString("pl-PL")}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-800 rounded-2xl p-5"
          >
            <h2 className="text-lg font-medium mb-3 text-amber-400">Produkty</h2>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-gray-700 pb-2 relative"
                >
                  <div className="text-gray-200 relative inline-block group">

                    <span className="text-amber-500 font-semibold mr-2">
                      {index + 1}.
                    </span>
                    <Link
                      to={`/product/${item.product_id}`}
                      className="hover:text-amber-400 transition font-medium relative z-1"
                    >
                      {item.title}
                    </Link>

                    <span className="text-gray-400 text-sm ml-2">× {item.quantity}</span>

                    {/* Preview */}
                    <div className="absolute bottom-full left-auto mb-2 z-20
                                opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-120
                                pointer-events-none transition-all duration-300 ease-out">
                      <div className="relative bg-neutral-900 border border-amber-600/40 
                                      rounded-xl overflow-hidden shadow-2xl shadow-black/50">
                        <img
                          src={item.image_url || '/no_image.png'}
                          alt={item.title}
                          className="w-44 h-44 object-cover opacity-95"
                        />
                        <div className="absolute bottom-0 w-full bg-black/70 text-amber-300 
                                        text-center py-1 text-sm font-semibold">
                          {formatPrice(item.product_price)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-amber-400 font-medium">
                    {formatPrice(item.product_price)}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-right mt-4 text-xl font-semibold text-amber-500">
              Razem: {formatPrice(order.total_price)}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
