const API_URL = "https://129.159.28.206/api"; // твій бекенд


export async function checkToken() {
  const token = sessionStorage.getItem("token");
  const res = await fetch(`${API_URL}/verify-token`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.ok; // якщо 200 — токен ще дійсний
}
