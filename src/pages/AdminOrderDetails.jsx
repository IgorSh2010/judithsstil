import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAdminOrder, getOrderStatuses, updateOrderStatus, getPaymentMethods, updateOrderPayment } from "../api/user";
import { formatPrice, formatDate } from "../utils/formats";
import Toast from "../components/ui/Toast";
import { ArrowLeft } from "lucide-react";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [statuses, setStatus] = useState(null);
  const [editingStatus, setEditingStatus] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);
  const [payment, setPaymentMethods] = useState(null);
  const [editingTransactionDate, setEditingTransactionDate] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
  const load = async () => {
        const [orderData, statusesData, paymentsData] = await Promise.all([
        getAdminOrder(id),
        getOrderStatuses(),
        getPaymentMethods(),
        ]);

        setOrder(orderData);
        setStatus(statusesData);
        setPaymentMethods(paymentsData);
    };

    load();
    }, [id]);

useEffect(() => {
    if (order) {
        setEditingStatus(order.status_id);
        setEditingPayment(order.payment_method);
        setEditingTransactionDate(order.payment_date?.slice(0, 16));
    }
    }, [order]);

  if (!order)
    return (
      <div className="text-center text-gray-400 pt-40">Ładowanie...</div>
    );

  return (
    <div className="min-h-screen bg-black text-gray-200 pt-36 pb-4 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/admin/orders"
          className="inline-flex mt-2 items-center gap-2 text-amber-400 hover:text-amber-300 transition"
        >
          <ArrowLeft size={18} /> Powrót
        </Link>

        {/* header */}
        <h1 className="text-4xl font-extrabold text-gold mb-6">
          Zamówienie #{order.id}
        </h1>
        <p className="text-gray-400 text-sm mb-10">
          utworzono: {formatDate(order.order_date)} •
          ostatnia aktualizacja: {formatDate(order.order_updated_at)}
        </p>

        {/* customer block */}
        <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 mb-10">
          <h2 className="text-xl font-bold text-gold mb-4">Dane klienta</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Imię i nazwisko</p>
              <p className="font-medium text-gray-200">{order.username}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="font-medium">{order.email}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Telefon</p>
              <p className="font-medium">{order.phone || "—"}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Adres dostawy</p>
              <p className="font-medium">{order.adress || "—"}</p>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-normal gap-4">
  
                {/* payment method */}
                <div className="flex-1">
                    <p className="text-gray-400 text-sm">Metoda płatności</p>
                    <select
                    value={editingPayment}
                    onChange={(e) => {
                        const newMethod = e.target.value;
                        setEditingPayment(newMethod);
                        updateOrderPayment(order.id, newMethod, false); 
                        
                        setToast({
                        show: true,
                        message: "Metoda płatności została zmieniona",
                        type: "success",
                        });

                        setTimeout(() => setToast({ show: false, message: "" }), 4000);
                    }}
                    className="bg-gray-800 uppercase border border-gray-700 rounded px-2 py-1 mt-1  text-gray-200 w-full"
                    >
                    {payment?.map((p) => (
                        <option key={p.method} value={p.method}>
                            {p.method}
                        </option>
                    ))}
                    </select>
                    {/* ID транзакції */}
                    <div className="text-gray-500 text-xs italic">ID transakcji: {order.payment_external_id}</div>
                </div>

                {/* transaction date */}
                <div className="flex-1 items-center">               
                    <p className="text-gray-400 text-sm">Data płatności</p>
                    {/* Дата транзакції (редагована) */}
                    <input
                        type="datetime-local"
                        value={editingTransactionDate}
                        onChange={(e) => setEditingTransactionDate(e.target.value)}
                        onBlur={() => {
                        if (editingTransactionDate) {
                            updateOrderPayment(order.id, editingTransactionDate, true);

                            setToast({
                            show: true,
                            message: "✅ Data płatności została zaktualizowana!",
                            type: "success",
                            });
                            setTimeout(() => setToast({ show: false, message: "" }), 4000);
                            }
                        }}
                        className="bg-gray-800 border border-gray-700 text-gray-200 px-3 py-1 mt-1 rounded"
                    />
                </div>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Status</p>
              <select
                value={editingStatus}
                onChange={(e) => {
                const newStatus = Number(e.target.value);
                setEditingStatus(newStatus);
                updateOrderStatus(order.id, newStatus);

                setToast({ show: true, message: "✅ Status został zaktualizowany!", type: "success" });
                setTimeout(() => setToast({ show: false, message: "" }), 4000);
                }}
                className="bg-gray-800 border border-gray-700 rounded px-2 py-1 mt-1 text-gray-200"
              >
                {statuses?.map((s) => (
                <option key={s.id} value={s.id}>
                    {s.label}
                </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* products */}
        <div className="bg-gray-900/40 p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-bold text-gold mb-4">
            Produkty w zamówieniu
          </h2>

          <table className="w-full text-gray-300">
            <thead>
              <tr className="text-gray-500 text-sm uppercase border-b border-gray-800">
                <th className="py-2 text-left">Nr poz.</th>
                <th className="py-2 text-left">Produkt</th>
                <th className="py-2 text-left">Ilość</th>
                <th className="py-2 text-left">Cena</th>
                <th className="py-2 text-left">Razem</th>
              </tr>
            </thead>

            <tbody>
              {order.products.map((p, index) => (
                <tr
                  key={p.id}
                  className="border-b border-gray-800 hover:bg-gray-800/40 transition"
                >
                  <td className="w-11 text-center align-middle text-amber-500 font-semibold mr-2">
                    {index + 1}.
                  </td>
                  <td className="py-3 font-medium">{p.title}</td>
                  <td className="py-3">{p.quantity}</td>
                  <td className="py-3 text-gray-200">{formatPrice(p.product_price)}</td>
                  <td className="py-3 text-gold font-semibold">
                    {formatPrice(p.total_item)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right mt-6 text-2xl font-bold text-gold">
            Suma: {formatPrice(order.total_price)}
          </div>
        </div>
      </div>

     <Toast show={toast.show} message={toast.message} type={toast.type} /> 
    </div>
  );
}
