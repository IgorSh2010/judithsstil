import api from "./axios";

export async function getLogo() {
  const { data } = await api.get("/public/logo");
  if (data && data.logoUrl) {
    return data.logoUrl;
  } else {
    throw new Error("Logo not found");
  }
}

export async function getBanner() {
  const { data } = await api.get("/public/banner");
  if (data && data.bannerUrl) {
    return data.bannerUrl;
  } else {
    throw new Error("Banner not found");
  }
}