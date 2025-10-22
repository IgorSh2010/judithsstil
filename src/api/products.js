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

/* // Додати продукт
export const addProduct = async (formData) => {
  const res = await axios.post(`${API_URL}/products/create`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data"
    }
  });
  return res.data;
};

// Отримати всі продукти
export const getProducts = async () => {
  const res = await axios.get(`${API_URL}/products/get`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });
  return res.data;
};

// Перевірити наявність продукту
export const isAvailable = async (productID, newStatus) => {
  const res = await axios.put(`${API_URL}/products/${productID}/availability`, 
    { available: newStatus },
    {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });

  return res;
};

// Видалити продукт
export const delProduct = async (productID) => {
  const res = await axios.delete(`${API_URL}/products/${productID}`, {  
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });
  return res;
};
 */