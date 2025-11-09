import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProductByID} from "../api/public";
import { updateProduct } from "../api/products";
import { Button } from "../components/ui/Button";
import { Plus, Trash2, Upload } from "lucide-react";
import Toast from "../components/ui/Toast";

function getChangedFields(original, updated) {
  const changes = {};
  for (const key in updated) {
    const originalValue = original[key];
    const newValue = updated[key];

    // Якщо значення змінилось
    if (JSON.stringify(originalValue) !== JSON.stringify(newValue)) {
      changes[key] = newValue;
    }
  }
  return changes;
}

export default function ProductEdit({onProductUpdated}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [product, setProduct] = useState(null);
  const [initialProduct, setInitialProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({  images: [] });
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const availableSizes = ["XS", "S", "M", "L", "XL", "ONESIZE"];

    useEffect(() => {
      return () => {
        // Очистка створених об’єктних URL
        form.images?.forEach((file) => URL.revokeObjectURL(file.preview));
      };
    }, [form.images]);

    useEffect(() => {
    const fetchProducts = async () => {
        try {
          const data = await getProductByID(id);
          setProduct(data);
          setInitialProduct(data);
        } catch (err) {
          console.error("❌ Błąd pobierania produktów:", err);
        } finally {
          setLoading(false);
        }
      };
      
      fetchProducts();
      }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFiles = (e) => {
     const files = Array.from(e.target.files);

      const previewUrls = files.map((file) => URL.createObjectURL(file));

      // Додаємо прев’ю у відображення продукту
      setProduct((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...previewUrls],
      }));

      // Зберігаємо файли для відправки на бекенд
      setForm((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...files],
      }));

      // Очищаємо input (щоб можна було повторно вибирати ті ж самі файли)
      e.target.value = "";
  };

  const toggleSize = (size) => {
    setProduct((prev) => {
      const sizes = prev.sizes || [];
      if (sizes.includes(size)) {
        return { ...prev, sizes: sizes.filter((s) => s !== size) };
      } else {
        return { ...prev, sizes: [...sizes, size] };
      }
    });
  };

  const removeImage = (index) => {
    const removed = product.images[index];

    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));

    // Якщо це не локальне прев’ю (тобто URL не з blob:), додаємо до removedImages
    if (!removed.startsWith("blob:")) {
      setForm((prev) => ({
        ...prev,
        removedImages: [...(prev.removedImages || []), removed],
      }));
    } else {
      // Якщо це blob, потрібно також прибрати відповідний файл із form.images
      setForm((prev) => ({
        ...prev,
        images: prev.images.filter(
          (_, i) => i !== index - (product.images.length - prev.images.length)
        ),
      }));
    }
  };

  const handleSave = async () => {
    if (!product || !initialProduct) return;
    const changedFields = getChangedFields(initialProduct, product);

    if (form.images && form.images.length > 0) {
    changedFields.images = form.images;
  }

    if (form.removedImages?.length > 0) {
    changedFields.removedImages = form.removedImages;
  }

    if (Object.keys(changedFields).length === 0) {
      setToast({ show: true, message: "🔹 Brak zmian do zapisania.", type: "error" });
      setTimeout(() => setToast({ show: false, message: "" }), 4000);
    return;
  }
    setSaving(true);
    try {
      console.log("changedFields", changedFields)
      const res = await updateProduct(changedFields, product.id);
         if (res.message !== "") {
            setToast({ show: true, message: "✅ Produkt został zaktualizowany!", type: "success" });
            setTimeout(() => setToast({ show: false, message: "" }), 4000);
        } 
        if (onProductUpdated) onProductUpdated();
    } catch (err) {
      console.error("Błąd zapisu:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="text-center text-gray-400 mt-10">Ładowanie produktu...</div>
    );
  if (!product)
    return (
      <div className="text-center text-red-500 mt-10">
        Nie znaleziono produktu.
      </div>
    ); 

  return (
    <div className="max-w-4xl mx-auto bg-[#0f0f0f] text-gray-200 p-6 rounded-xl border border-gray-800 shadow-md mt-36 mb-4">
      <h1 className="text-2xl font-bold text-[#d4af37] mb-4">
        Edycja produktu: {product?.title} (ID: {product?.id})
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Назва */}
        <div>
          <label className="block text-sm mb-1 text-gray-400">Nazwa</label>
          <input
            type="text"
            name="name"
            value={product.title || ""}
            onChange={handleChange}
            className="w-full bg-gray-900 text-gray-100 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-[#d4af37]"
          />
        </div>

        {/* Ціна */}
        <div>
          <label className="block text-sm mb-1 text-gray-400">Cena (zł)</label>
          <input
            type="number"
            name="price"
            value= {product.price  || ""}
            onChange={handleChange}
            className="w-full bg-gray-900 text-gray-100 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-[#d4af37]"
          />
        </div>

        {/* Категорія */}
        <div>
          <label className="block text-sm mb-1 text-gray-400">Kategoria</label>
          <input
            type="text"
            name="category"
            value={product.category || ""}
            onChange={handleChange}
            className="w-full bg-gray-900 text-gray-100 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-[#d4af37]"
          />
        </div> 

        {/* Опис */}
        <div className="md:col-span-2">
          <label className="block text-sm mb-1 text-gray-400">Opis</label>
          <textarea
            name="description"
            rows="4"
            value={product.description || ""}
            onChange={handleChange}
            className="w-full bg-gray-900 text-gray-100 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-[#d4af37] resize-none"
          ></textarea>
        </div>

        {/* Вибір розмірів */}
        <div className="md:col-span-2">
          <label className="block text-sm mb-2 text-gray-400">
            Dostępne rozmiary
          </label>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                type="button"
                className={`px-3 py-1 rounded-lg border transition-all ${
                  product.sizes?.includes(size)
                    ? "bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37]"
                    : "bg-gray-900 border-gray-700 text-gray-400 hover:border-[#d4af37]/40"
                }`}
              >
                {size}
              </button>
            ))}
            <button
              onClick={() => setProduct((p) => ({ ...p, sizes: [] }))}
              type="button"
              className="ml-2 text-xs text-gray-500 hover:text-[#d4af37] underline"
            >
              Bez rozmiarów
            </button>
          </div>
        </div>

        {/* Statusy produktu */}
        <div className="md:col-span-2 mt-4">
          <label className="block text-sm mb-2 text-gray-400">Status produktu</label>
          <div className="flex flex-wrap gap-6 bg-gray-900 border border-gray-700 rounded-lg p-4">
            {[
              { key: "is_available", label: "Dostępny" },
              { key: "is_bestseller", label: "Bestseller" },
              { key: "is_featured", label: "Polecany" },
            ].map((item) => (
              <label
                key={item.key}
                className="flex items-center gap-2 text-sm cursor-pointer text-gray-300 hover:text-[#d4af37]"
              >
                <input
                  type="checkbox"
                  checked={!!product[item.key]}
                  onChange={(e) =>
                    setProduct((prev) => ({
                      ...prev,
                      [item.key]: e.target.checked,
                    }))
                  }
                  className="accent-[#d4af37] w-4 h-4 cursor-pointer"
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Зображення */}
        <div className="md:col-span-2">
          <label className="block text-sm mb-2 text-gray-400">Zdjęcia</label>
          <div className="flex flex-wrap gap-3">
            {product.images?.map((img, i) => (
              <div
                key={i}
                className="relative w-28 h-28 border border-gray-700 rounded-lg overflow-hidden group"
              >
                <img
                  src={img}
                  alt={`Zdjęcie ${i + 1}`}
                  className="object-cover w-full h-full"
                />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-black/70 hover:bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}

            {/* Add button */}
            <div
              onClick={() => fileInputRef.current.click()}
              className="w-28 h-28 flex items-center justify-center border-2 border-dashed border-gray-700 text-gray-500 hover:border-[#d4af37] hover:text-[#d4af37] rounded-lg cursor-pointer transition"
            >
              <Plus size={20} />
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleFiles}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <Link
          to="/admin/products"
          className="mt-8 inline-block text-sm text-gray-400 hover:text-[#d4af37] transition-all"
        >
          ← Wróć do listy produktów
        </Link>
        <div className="flex  gap-3 mt-6">              
          <Button
            onClick={() => navigate(-1)}
            className="bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 rounded-lg px-4 py-2 transition"
          >
            Anuluj
          </Button>

          <Button
            onClick={handleSave}
            disabled={saving}
            className="gap-2 bg-[#d4af37] text-black font-semibold hover:bg-[#e6c34d] rounded-lg px-5 py-2 transition"
          >
            <Upload size={20} /> {saving ? "Zapisywanie..." : "Zapisz zmiany"}
          </Button>
        </div>
      </div>
      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  );
}
