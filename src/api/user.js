import api from "./axios";

export async function me() {
  const { data } = await api.get("/me");
  return data;
}

export async function checkToken() {
  const token = localStorage.getItem("token");
  const res = await api.get(`/verify-token`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.ok; // якщо 200 — токен ще дійсний
}

export async function updateUser(data) {
  const response = await api.post("/users/update", data);
  return response.data;
}

export async function uploadImage(formData) {
  const response = await api.post("/users/upload-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}