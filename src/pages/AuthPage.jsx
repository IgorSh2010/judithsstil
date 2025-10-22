import { useState } from "react"
import { registerUser, loginUser } from "../api/auth"
import { useNavigate } from "react-router-dom"

export default function AuthPage() {
  const [registerData, setRegisterData] = useState({ email: "", password: "", tenant: "judithsstil" })
  const [loginData, setLoginData] = useState({ email: "", password: "", tenant: "judithsstil"  })
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    const res = await registerUser(registerData)
    setMessage(res.message || "Registered successfully!")
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await loginUser(loginData)
    if (res.token) {
      sessionStorage.setItem("token", res.token);
      navigate("/");
      window.location.reload();
      setMessage("Login successful!");
    } else {
      setMessage(res.message || "Login failed")
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
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition"
            >
              Zarejestruj
            </button>
          </form>
        </div>
      </div>

      {message && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-rose-700 text-white px-6 py-3 rounded-full text-base shadow-lg flex items-center gap-3 animate-fade-in">
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
  )
}