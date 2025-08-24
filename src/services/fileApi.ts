import axios from "axios";

interface FileUploadData {
  [key: string]: string;
}

export interface FileUploadResponse {
  success: boolean;
  data: FileUploadData;
  message: string;
  errorCode: string | null;
  timestamp: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

/* POST - 이미지 업로드 */
export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post<FileUploadResponse>(`/files`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("[POST] 이미지 업로드 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("[POST] 이미지 업로드 에러:", error);
    throw error;
  }
};
