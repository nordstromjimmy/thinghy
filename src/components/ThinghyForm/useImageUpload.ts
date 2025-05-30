import { useState } from "react";
import { showErrorToast } from "@/components/ShowToast";

type UploadResult = {
  fileName: string;
  path: string;
};

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File): Promise<UploadResult | null> => {
    setUploading(true);

    if (!file) {
      showErrorToast("No file selected.");
      setUploading(false);
      return null;
    }

    // ✅ Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      showErrorToast("Image too large. Max size is 5MB.");
      setUploading(false);
      return null;
    }

    // ✅ Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      showErrorToast("Unsupported image format. Use JPG, PNG, or WEBP.");
      setUploading(false);
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        showErrorToast("Upload failed");
        return null;
      }

      return { fileName: file.name, path: result.path };
    } catch (error) {
      showErrorToast("Unexpected error during upload");
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading };
}
