import axios from "axios";

//const API_URL = "https://129.159.28.206/api";
const API_URL = "/api";

const api = axios.create({
  baseURL: API_URL,
});

const raw = axios.create({
  baseURL: API_URL,
});

// === Interceptor для access token ===
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// === Interceptor для refresh token ===
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Якщо токен прострочений (401) і ще не оновлювали
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        const { data } = await raw.post(`/auth/refresh-token`, {
          refreshToken,
        });

        localStorage.setItem("token", data.newAccessToken);

        // Повторити запит із новим токеном
        originalRequest.headers.Authorization = `Bearer ${data.newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token error:", err);
        localStorage.clear();
        window.location.href = "/src/pages/AuthPage.jsx"; // Перенаправлення на сторінку входу
      }
    }

    return Promise.reject(error);
  }
);

export default api;
