import { useState } from "react"
import { registerUser, loginUser } from "../api/auth"
import Toast from "../components/ui/Toast"
import { Eye } from "lucide-react"

export default function AuthPage() {
  const [registerData, setRegisterData] = useState({ email: "", password: "", tenant: "judithsstil" })
  const [loginData, setLoginData] = useState({ email: "", password: "", tenant: "judithsstil"  })
  const [confirm, setConfirm] = useState("");
  const passwordsMatch = confirm.length === 0 || registerData.password === confirm;
  const [toast, setToast] = useState({ show: false, message: "", type: "success" })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [hovered, setHovered] = useState(null); // "login" | "register" | null
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

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
     <div className="mt-16 min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="relative max-w-5xl w-full flex gap-6">

        {/* 🔸 Login Block */}
        <div
          onMouseEnter={() => setHovered("login")}
          onMouseLeave={() => setHovered(null)}
          className={`
            transition-all duration-500 ease-out
            bg-white rounded-2xl shadow-lg p-8 flex-1
            ${hovered === "login" && "scale-105 z-10 shadow-2xl"}
            ${hovered === "register" && "scale-95 opacity-70 -translate-x-4"}
          `}
        >
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
        <div
          onMouseEnter={() => setHovered("register")}
          onMouseLeave={() => setHovered(null)}
          className={`
            transition-all duration-500 ease-out
            bg-white rounded-2xl shadow-lg p-8 flex-1
            ${hovered === "register" && "scale-105 z-10 shadow-2xl "}
            ${hovered === "login" && "scale-95 opacity-70 translate-x-4"}
          `}
        >
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

            <div className="relative">
              <input
                type={showPassword1 ? "text" : "password"}
                placeholder="Hasło"
                className="w-full border px-3 py-2 bg-gray-300/30 rounded"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500/50 select-none"
                onMouseDown={() => setShowPassword1(true)}
                onMouseUp={() => setShowPassword1(false)}
                onMouseLeave={() => setShowPassword1(false)}
                onTouchStart={() => setShowPassword1(true)}
                onTouchEnd={() => setShowPassword1(false)}
              >
                <Eye />
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword2 ? "text" : "password"}
                placeholder="Hasło (powtórzenie)"
                className="w-full border px-3 py-2 bg-gray-300/30 rounded"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500/50 select-none"
                onMouseDown={() => setShowPassword2(true)}
                onMouseUp={() => setShowPassword2(false)}
                onMouseLeave={() => setShowPassword2(false)}
                onTouchStart={() => setShowPassword2(true)}
                onTouchEnd={() => setShowPassword2(false)}
              >
                <Eye />
              </button>
            </div>

          {!passwordsMatch && (
            <p className="text-sm text-red-600">
              Hasła muszą być identyczne
            </p>
          )}

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