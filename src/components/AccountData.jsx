import { useEffect, useState } from "react";
import { updateUser, me } from "../api/user";
import { checkToken } from "../hooks/useMe";
//import { toast } from "react-hot-toast";

export default function AccountData() {
  //const [userMe, setUserMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' lub 'error'
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
        console.log("Fetched userMe in AccountData:", data);
        //setUserMe(data.user);
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
      setMessage("Hasła nie są takie same");
      setMessageType("error");
      return;
    }
    console.log(isValidToken);    
    if (!isValidToken === "ok") {
      setMessage("Twój token wygasł. Zaloguj się ponownie.");
      setMessageType("error");
      localStorage.removeItem("token");
      window.location.href = "/AuthPage";
      return;
    }

    try {
      await updateUser(formData);
      setMessage("Dane zapisane pomyślnie!");
      setMessageType("success");
      setFormData({ ...formData, password: "", confirmPassword: "" });
    } catch (err) {
      console.error(err);
      setMessage("Błąd podczas aktualizacji danych");
      setMessageType("error");
    }
  };

  if (loading) return <p className="text-center mt-10">Ładowanie...</p>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-36 mb-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Dane konta</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Imię i Nazwisko</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Numer telefonu</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Adres dostawy</label>
          <input
            type="text"
            name="adress"
            value={formData.adress}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Nowe hasło</label>
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
          <label className="block text-gray-700 font-medium mb-2">Powtórz hasło</label>
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
          className="w-full bg-amber-400 hover:bg-amber-500 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Zapisz zmiany
        </button>
      </form>

      {message && (
        <div className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 text-white px-6 py-3
                         rounded-full text-base shadow-lg flex items-center gap-3 animate-fade-in
                         ${messageType === 'success' ? 'bg-green-600' : 'bg-rose-700'}`}>
            <span>{message}</span>
            <button
            onClick={() => setMessage("")}
            className="text-white text-xl leading-none hover:text-gray-200"
            aria-label="Zamknij"
            >
            ×
            </button>
        </div>
     )}
    </div>
  );
}
