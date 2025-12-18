import { useState } from "react"
import { registerUser, loginUser } from "../api/auth"
import Toast from "../components/ui/Toast"

export default function AuthPage() {
  const [registerData, setRegisterData] = useState({ email: "", password: "", tenant: "judithsstil" })
  const [loginData, setLoginData] = useState({ email: "", password: "", tenant: "judithsstil"  })
  const [toast, setToast] = useState({ show: false, message: "", type: "success" })
  const [acceptTerms, setAcceptTerms] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()

    if (!acceptTerms) {
      setToast({show: true, message: "Aby się zarejestrować musisz zaakceptować regulamin i politykę prywatności.", type: "error"});
      setTimeout(() => setToast({ show: false, message: "" }), 4000)
      return;
    }

    const res = await registerUser(registerData)
    if (res.error) {
      setToast({ show: true, message: `❌ Błąd rejestracji: ${res.error}`, type: "error" })
      setTimeout(() => setToast({ show: false, message: "" }), 4000)
      return
    }
    
    setToast({ show: true, message: "✅ Rejestracja zakończona sukcesem! Teraz możesz się zalogować.", type: "success" })
    setTimeout(() => setToast({ show: false, message: "" }), 4000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await loginUser(loginData)
    if (res.token) {
      localStorage.setItem("token", res.token);

      window.location.href = "/admin/products";

      setToast({ show: true, message: "✅ Zalogowano pomyślnie!", type: "success" });
      setTimeout(() => setToast({ show: false, message: "" }), 4000);
    } else {
      setToast({ show: true, message: "❌ Błąd logowania. Sprawdź swoje dane.", type: "error" });
      setTimeout(() => setToast({ show: false, message: "" }), 4000);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 my-36 md:my-0">
      <div className="max-w-5xl w-full grid md:grid-cols-2 bg-white shadow-lg rounded-2xl overflow-hidden">
        
        {/* 🔸 Login Block */}
        <div className="p-8 flex flex-col justify-center">
          <div className="text-base font-light">Masz już konto?</div> 
          <h2 className="text-2xl font-bold mb-4">Zaloguj się</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border px-3 py-2 rounded"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Hasło"
              className="w-full border px-3 py-2 rounded"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition"
            >
              Zaloguj
            </button>
          </form>
        </div>

        {/* 🔸 Register Block */}
        <div className="bg-gray-100 p-8 flex flex-col justify-center">            
          <div className="text-base font-light">Załóż, jak nie masz...</div>
          <h2 className="text-2xl font-bold mb-4">Zarejestruj się</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border px-3 py-2 rounded"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Hasło"
              className="w-full border px-3 py-2 rounded"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            />

            <div className="flex items-start space-x-2 text-sm text-gray-700">
              <input
                type="checkbox"
                id="rules"
                className="mt-1"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                required
              />
              <label htmlFor="rules">
                Rejestrując się, akceptujesz{" "}
                <a href="/regulamin" target="_blank" className="text-pink-600 underline">Regulamin</a>{" "}
                oraz{" "}
                <a href="/PolitykaPrywatnosci" target="_blank" className="text-pink-600 underline">Politykę Prywatności</a>.
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition"
            >
              Zarejestruj
            </button>
          </form>
        </div>
      </div>

      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  )
}