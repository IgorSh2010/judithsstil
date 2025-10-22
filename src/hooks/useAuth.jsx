import { useState, useEffect } from "react";

export function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
    const token = sessionStorage.getItem("token")
    if (!token) return

    try {
      // JWT має структуру: header.payload.signature
      const payload = JSON.parse(atob(token.split(".")[1]))
      setUser({
        id: payload.id,
        email: payload.email,
        tenant: payload.tenant,
      })
    } catch (e) {
      console.error("Invalid token:", e)
      sessionStorage.removeItem("token")
    }
  }, [])

  const logout = () => {
    sessionStorage.сlear()
    window.location.href = "/"
    setUser(null)
  }

  return { user, logout }
}