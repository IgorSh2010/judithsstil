import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { me } from "../api/user.js";

const AdminProtectedRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        setLoading(true);
        const data = await me();
        const userMe = data.user;
        //console.log("UserMe in AdminProtectedRoute:", userMe);
        if (!userMe) {
          console.log("❌ Brak użytkownika (niezalogowany)");
          setAuthorized(false);
          return;
        }

        if (userMe.role === "admin") {
          setAuthorized(true);
          return;
        } 

        setAuthorized(false);
      } catch (err) {
        console.error("❌ Auth error:", err);
        setAuthorized(false);
      }
    };

    verifyAdmin();
    setLoading(false);
  }, []);

  if (loading || authorized === null) {
    return <div className="text-center mt-10">Sprawdzanie uprawnień...</div>;
  }

  if (!authorized) return <Navigate to="/" replace/>;

  return children;
};

export default AdminProtectedRoute;
