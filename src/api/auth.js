import api from "./axios";

export async function registerUser(data) {
  const { data: resData } = await api.post("/auth/register", data, {
    headers: { "Content-Type": "application/json" },
  });
  return resData;
}

export async function loginUser(loginData) {
    try {
    const { data } = await api.post("/auth/login", {
      email: loginData.email,
      password: loginData.password,
      tenant: loginData.tenant,
    }, {
      headers: { "Content-Type": "application/json" },
    });
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("refreshToken", data.refreshToken);
    return data;
  } catch (error) {
    console.error("❌ loginUser error:", error);
    if (error.response) {
      console.error("Response error:", error.response);
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("Config error:", error.message);
    }
    throw error;
  }
}

export async function logout() {
  const refreshToken = sessionStorage.getItem("refreshToken");
  if (refreshToken) {
    await api.post("/auth/logout", { refreshToken });
  }
  sessionStorage.clear();
}