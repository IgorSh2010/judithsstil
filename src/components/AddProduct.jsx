import { useState, useEffect, useRef } from "react";
import { addProduct } from "../api/products";
import { getCategories } from "../api/public";
import CategorySelect from "./ui/CategorySelect";
import Toast from "./ui/Toast";
import { Plus, Trash2 } from "lucide-react";

export default function AddProduct({ onProductAdded }) {
  const fileInputRef = useRef();
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    images: [],
    sizes: [],
    bestseller: false,
    featured: false,
    available: true,
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    return () => previewImages.forEach((url) => URL.revokeObjectURL(url));
  }, [previewImages]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      console.log(data.rows);
      setAvailableCategories(data.rows.map((c) => c.name)
                                      .filter((name) => typeof name === "string" && name.trim() !== "")); // якщо бекенд повертає масив об’єктів
      
    } catch (err) {
      console.error("Błąd podczas pobierania kategorii:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setForm((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
    e.target.value = "";
  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    URL.revokeObjectURL(previewImages[index]);
    setPreviewImages(previewImages.filter((_, i) => i !== index));
  };

  const toggleSize = (size) => {
    setForm((prev) => {
      const sizes = prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    for (const key in form) {
      if (key === "images") {
        for (let img of form.images) formData.append("images", img);
      } else if (key === "sizes") {
        formData.append("sizes", JSON.stringify(form.sizes));
      } else {
        formData.append(key, form[key]);
      }
    }

    try {
      const res = await addProduct(formData);
      if (res.message !== "") {
        setToast({ show: true, message: "✅ Produkt został dodany!", type: "success" });
        setTimeout(() => setToast({ show: false, message: "" }), 3000);
        if (onProductAdded) onProductAdded();
        setForm({
          name: "",
          category: "",
          description: "",
          price: "",
          images: [],
          sizes: [],
          bestseller: false,
          featured: false,
          available: true,
        });
        setPreviewImages([]);
      }
    } catch (err) {
      console.error("❌ Błąd dodawania produktu:", err);
      setToast({ show: true, message: "❌ Błąd dodawania produktu.", type: "error" });
      setTimeout(() => setToast({ show: false, message: "" }), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0f0f0f] text-gray-200 shadow-lg rounded-lg p-8 my-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-[#d4af37] mb-6">Dodaj produkt</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ліва колонка */}
        <div className="space-y-4">
          {/* Назва */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-400">Nazwa</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Wprowadź nazwę produktu"
              className="w-full bg-gray-900 text-gray-100 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-[#d4af37]"
            />
          </div>

          {/* Kategoria */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-400">Kategoria</label>
            <CategorySelect
              value={form.category}
              onChange={(value) =>
                          handleChange({ target: { name: "category", value } })
              }
              className="w-full border border-gray-700 p-2 rounded-lg focus:ring-2 focus:ring-[#d4af37]"
              available={availableCategories}
              setAvailable={setAvailableCategories}
            />
          </div>

          {/* Cena */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-400">Cena</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Podaj cenę"
              className="w-full bg-gray-900 text-gray-100 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-[#d4af37]"
            />
          </div>

          {/* Rozmiary */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-400">Rozmiary</label>
            <div className="flex flex-wrap gap-3">
              {["XS", "S", "M", "L", "XL", "ONESIZE"].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-1 rounded-lg border ${
                    form.sizes.includes(size)
                      ? "bg-[#d4af37] text-black border-[#d4af37]"
                      : "bg-gray-900 border-gray-700 text-gray-400 hover:border-[#d4af37]"
                  } transition`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Права колонка */}
        <div className="space-y-4">
          {/* Opis */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-400">Opis</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Krótki opis produktu"
              className="w-full h-[115px] bg-gray-900 text-gray-100 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-[#d4af37] resize-none"
            />
          </div>

          {/* Statusy */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-400">Statusy</label>
            <div className="flex flex-wrap gap-4">
              {[
                { key: "bestseller", label: "Bestseller" },
                { key: "featured", label: "Polecany" },
                { key: "available", label: "Dostępny" },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name={key}
                    checked={form[key]}
                    onChange={handleChange}
                    className="accent-[#d4af37] w-4 h-4"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Zdjęcia */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-400">Zdjęcia</label>
            <div className="flex flex-wrap gap-3">
              {previewImages.map((img, i) => (
                <div key={i} className="relative w-24 h-24 border border-gray-700 rounded-lg overflow-hidden group">
                  <img src={img} alt={`preview ${i}`} className="object-cover w-full h-full" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-black/70 hover:bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <div
                onClick={() => fileInputRef.current.click()}
                className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-700 text-gray-500 hover:border-[#d4af37] hover:text-[#d4af37] rounded-lg cursor-pointer transition"
              >
                <Plus size={18} />
              </div>
              <input
                type="file"
                name="images"
                multiple
                ref={fileInputRef}
                onChange={handleFiles}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Кнопка сабміту */}
        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d4af37] text-black font-semibold py-2 rounded-lg hover:bg-[#e6c34d] transition disabled:opacity-60"
          >
            {loading ? "Zapisywanie..." : "Zapisz produkt"}
          </button>
        </div>
      </form>

      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  );
}