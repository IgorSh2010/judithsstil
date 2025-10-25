import { useState } from "react";
import { Button } from "./ui/Button";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/Card";
import { uploadImage } from "../api/user";
import Toast from "./ui/Toast";

export default function SiteSettings() {
  const [banner, setBanner] = useState(null);
  const [logo, setLogo] = useState(null);
  const [previewBanner, setPreviewBanner] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file, type) => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", type);

    try {
      const res = await uploadImage(formData);

      setToast({ show: true, message: "✅ Obraz został wgrany!", type: "success" });
      // ⏳ Автоматично закривається через 2 секунди
      setTimeout(() => setToast({ show: false, message: "" }), 4000);

      const url = res.data.url;
      if (type === "banner") setBanner(url);
      if (type === "logo") setLogo(url);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Ustawienia wyglądu</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Banner Card */}
        <Card className="overflow-hidden">
          <CardHeader>
            <h2 className="text-lg font-medium">Baner główny</h2>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
              {previewBanner ? (
                <img src={previewBanner} alt="Podgląd banera" className="object-cover w-full h-full" /> 
                ) : banner ? (
                <img src={banner} alt="Baner" className="object-cover w-full h-full" />
              ) : (
                <span className="text-gray-500">Brak banera</span>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                setPreviewBanner(URL.createObjectURL(file));
                handleUpload(file, "banner");
              }}
            />
            <Button disabled={loading}>{loading ? "Wgrywanie..." : "Zaktualizuj"}</Button>
          </CardFooter>
        </Card>

        {/* Logo Card */}
        <Card className="overflow-hidden">
          <CardHeader>
            <h2 className="text-lg font-medium">Logo</h2>
          </CardHeader>
          <CardContent>
            <div className="h-40 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
              {previewLogo ? (
                <img src={previewLogo} alt="Podgląd logo" className="object-contain w-40 h-40" />
              ) : logo ? (
                <img src={logo} alt="Logo" className="object-contain w-40 h-40" />
              ) : (
                <span className="text-gray-500">Brak logo</span>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                setPreviewLogo(URL.createObjectURL(file));
                handleUpload(file, "logo");
              }}
            />
            <Button disabled={loading}>{loading ? "Wgrywanie..." : "Zaktualizuj"}</Button>
          </CardFooter>
        </Card>
      </div>

      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  );
}
