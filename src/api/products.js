import api from "./axios";

export async function addProduct(formData) {
  const { data } = await api.post("/products/create",
    formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
}

export async function getProducts() {
  const { data } = await api.get("/products/get");
  return data;
}

export async function isAvailable(productID, newStatus) {
  const res = await api.put(`/products/${productID}/availability`, {
    available: newStatus,
  });
  return res;
}

export async function delProduct(productID) {
  const res = await api.delete(`/products/${productID}`);
  return res;
}