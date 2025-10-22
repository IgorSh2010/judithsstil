import api from "./axios";

//onst API_URL = "https://129.159.28.206/api";      

/* export async function registerUser(data) {
  // const res = await fetch(`${API_URL}/register`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data)
  // })
  // return res.json()
  const res = await axios.post(`${API_URL}/register`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
} */

export async function registerUser(data) {
  const { data: resData } = await api.post("/auth/register", data, {
    headers: { "Content-Type": "application/json" },
  });
  return resData;
}

export async function loginUser(loginData) {
  console.log("loginData:", loginData);

  try {
    const { data } = await api.post("/auth/login", loginData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("✅ login response data:", data);
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

/* export async function loginUser(loginData) {
  console.log("loginData:", loginData); 
  const { data } = await api.post("/auth/login", {
    email: loginData.email,
    password: loginData.password,
    tenant: loginData.tenant,
  }, {
    headers: { "Content-Type": "application/json" },
  });
  console.log("login response data:", data);
  sessionStorage.setItem("token", data.token);
  sessionStorage.setItem("refreshToken", data.refreshToken);
  return data;
} */
/* export async function loginUser(loginData) {
  console.log("loginData:", loginData);
  const { data } = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: loginData.email,
      password: loginData.password,
      tenant: loginData.tenant,
    }),
  }).then(res => res.json());
  console.log("login response data:", data);
  sessionStorage.setItem("token", data.token);
  sessionStorage.setItem("refreshToken", data.refreshToken);
  return data;
} */
    
    
    /* { loginData.email, loginData.password, loginData.tenant }, {
    headers: { "Content-Type": "application/json" },
  });
  sessionStorage.setItem("accessToken", data.accessToken);
  sessionStorage.setItem("refreshToken", data.refreshToken);
  return data;
} */

export async function logout() {
  const refreshToken = sessionStorage.getItem("refreshToken");
  if (refreshToken) {
    await api.post("/auth/logout", { refreshToken });
  }
  sessionStorage.clear();
}