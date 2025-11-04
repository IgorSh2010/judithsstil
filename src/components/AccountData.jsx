import { useEffect, useState } from "react";
import { updateUser, me, checkToken } from "../api/user";
import Toast from "./ui/Toast";

export default function AccountData() {
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [loading, setLoading] = useState(true);
  const { isValidToken } = checkToken();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    adress: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchUserMe = async () => {
      try {
        setLoading(true);
        const data = await me();
        // Заповнення форми отриманими даними
        if (data.user) {
          setFormData({
            username: data.user.username || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
            adress: data.user.adress || "",
            password: "",
            confirmPassword: "",
          });
        }
      } catch (err) {
        console.error("Error fetching userMe in AccountData:", err);
      }
      setLoading(false);
    };

    fetchUserMe();
  }, []);
   
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Просте підтвердження пароля
    if (formData.password && formData.password !== formData.confirmPassword) {
      setToast({ show: true, message: "❌ Hasła nie są zgodne.", type: "error" });
      // ⏳ Автоматично закривається через 4 секунди
      setTimeout(() => setToast({ show: false, message: "" }), 4000);
      return;
    }    
    if (!isValidToken === "ok") {
      setToast({ show: true, message: "❌ Sesja wygasła. Zaloguj się ponownie.", type: "error" });
      // ⏳ Автоматично закривається через 4 секунди
      setTimeout(() => setToast({ show: false, message: "" }), 4000);

      localStorage.removeItem("token");
      window.location.href = "/AuthPage";
      return;
    }

    try {
      await updateUser(formData);
      setToast({ show: true, message: "✅ Dane zostały zaktualizowane.", type: "success" });
      // ⏳ Автоматично закривається через 4 секунди
      setTimeout(() => setToast({ show: false, message: "" }), 4000);

      setFormData({ ...formData, password: "", confirmPassword: "" });
    } catch (err) {
      console.error(err);
      setToast({ show: true, message: "❌ Błąd podczas aktualizacji danych.", type: "error" });
      // ⏳ Автоматично закривається через 4 секунди
      setTimeout(() => setToast({ show: false, message: "" }), 4000);
    }
  };

  if (loading) return <p className="text-center mt-10">Ładowanie...</p>;

  return (
    <div className="w-full sm:max-w-3xl mx-auto p-8 bg-neutral-950 shadow-lg rounded-lg mt-36 mb-5">
      <h2 className="text-3xl font-bold mb-6 text-amber-400">Dane konta</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-amber-400 font-medium mb-2">Imię i Nazwisko</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div>
          <label className="block text-amber-400 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div>
          <label className="block text-amber-400 font-medium mb-2">Numer telefonu</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div>
          <label className="block text-amber-400 font-medium mb-2">Adres dostawy</label>
          <input
            type="text"
            name="adress"
            value={formData.adress}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div>
          <label className="block text-amber-400 font-medium mb-2">Nowe hasło</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Pozostaw puste jeśli nie zmieniasz"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div>
          <label className="block text-amber-400 font-medium mb-2">Powtórz hasło</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Powtórz nowe hasło"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-400 hover:bg-amber-500 text-black text-base font-semibold py-3 rounded-lg transition-colors"
        >
          Zapisz zmiany
        </button>
      </form>

      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  );
}
