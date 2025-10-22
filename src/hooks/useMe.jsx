const API_URL = "http://129.159.28.206:4000/api"; // твій бекенд


export async function checkToken() {
  const token = sessionStorage.getItem("token");
  const res = await fetch(`${API_URL}/verify-token`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.ok; // якщо 200 — токен ще дійсний
}
