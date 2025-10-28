import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductByID} from "../api/public";
import { Button } from "../components/ui/Button";
import { Plus, Trash2, Upload } from "lucide-react";

export default function ProductEdit() {
  const { product } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [Changedproduct, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newImage, setNewImage] = useState(null);

  const availableSizes = ["XS", "S", "M", "L", "XL", "ONESIZE"];

   /* useEffect(() => {
    const { data } = await getProductByID()
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Błąd wczytywania produktu:", err))
      .finally(() => setLoading(false));
  }, [id]); */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Псевдо-завантаження — можна пізніше замінити на справжнє API
    const reader = new FileReader();
    reader.onload = () => {
      setProduct((prev) => ({
        ...prev,
        images: [...(prev.images || []), reader.result],
      }));
      setNewImage(null);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      //await axios.put(`/api/products/${id}`, product);
      navigate("/admin/products");
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
    <div className="max-w-4xl mx-auto bg-[#0f0f0f] text-gray-200 p-6 rounded-xl border border-gray-800 shadow-md mt-6">
      <h1 className="text-2xl font-bold text-[#d4af37] mb-4">
        ✏️ Edytuj produkt
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Назва */}
        <div>
          <label className="block text-sm mb-1 text-gray-400">Nazwa</label>
          <input
            type="text"
            name="name"
            value={product.name || ""}
            //onChange={handleChange}
            className="w-full bg-gray-900 text-gray-100 border border-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-[#d4af37]"
          />
        </div>

        {/* Ціна */}
        <div>
          <label className="block text-sm mb-1 text-gray-400">Cena (zł)</label>
          <input
            type="number"
            name="price"
            value={product.price || ""}
            //onChange={handleChange}
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
            //onChange={handleChange}
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
            //onChange={handleChange}
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
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <Button
          onClick={() => navigate(-1)}
          className="bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 rounded-lg px-4 py-2 transition"
        >
          Anuluj
        </Button>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#d4af37] text-black font-semibold hover:bg-[#e6c34d] rounded-lg px-5 py-2 transition"
        >
          {saving ? "Zapisywanie..." : "Zapisz zmiany"}
        </Button>
      </div>
    </div>
  );
}
