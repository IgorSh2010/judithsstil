import { useState } from "react";
import { addProduct } from "../api/products";
import Toast from "./ui/Toast";

export default function AddProduct({ onProductAdded }) {
  const [form, setForm] = useState({ name: "", description: "", price: "", images: [] });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFiles = (e) => setForm({ ...form, images: e.target.files });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    for (const key in form) {
      if (key === "images") {
        for (let img of form.images) formData.append("images", img);
      } else {
        formData.append(key, form[key]);
      }
    }

    try {
      const res = await addProduct(formData);
      if (res.message !== "") {
        setToast({ show: true, message: "✅ Produkt został dodany!", type: "success" });
        // ⏳ Автоматично закривається через 2 секунди
        setTimeout(() => setToast({ show: false, message: "" }), 3000);
      } 
      if (onProductAdded) onProductAdded();
      setForm({ name: "", description: "", price: "", images: [] });
    } catch (err) {
      console.error("❌ Błąd dodawania produktu:", err);
      setToast({ show: true, message: "❌ Błąd dodawania produktu.", type: "error" });
      // ⏳ Автоматично закривається через 2 секунди
      setTimeout(() => setToast({ show: false, message: "" }), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 my-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Dodaj produkt</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={form.name} placeholder="Nazwa" onChange={handleChange} className="w-full border p-2 rounded" />
        <textarea name="description" value={form.description} placeholder="Opis" onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="number" name="price" value={form.price} placeholder="Cena" onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="file" name="images" multiple onChange={handleFiles} className="w-full border p-2 rounded" />
        <button type="submit" disabled={loading} className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition">
          {loading ? "Zapisywanie..." : "Zapisz"}
        </button>
      </form>
    
    <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>    
  );
}
