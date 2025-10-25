import api from "./axios";

export async function me() {
  const { data } = await api.get("/me");
  //console.log("me() response data:", data);
  return data;
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