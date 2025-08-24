import axios from "axios";

export interface BookData {
  id: number;
  familyId: number;
  name: string;
  pdfUrl: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookResponse {
  success: boolean;
  data: BookData | BookData[] | {};
  message: string;
  errorCode: string | null;
  timestamp: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

/* GET - 소식 책자 단건 */
export const getBooks = async (id: number) => {
  try {
    const response = await api.get<BookResponse>(`familes/${id}/book`);
    console.log(response.data);
    console.log("[GET] 소식 책자 단건: ", response.data);
    return response.data;
  } catch (error) {
    console.error("[GET] 소식 책자 단건 에러", error);
    throw error;
  }
};

/* POST - 소식 책자 생성 */
export const postBooks = async (familyId: number, name: string, file: File) => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    const response = await api.post<BookResponse>(
      `/families/${familyId}/book}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("[POST] 소식 책자 등록 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("[POST] 북 등록 에러:", error);
    throw error;
  }
};

/* PATCH - 소식 책자 이름 변경 */
export const patchPostName = async (bookId: number, name: string) => {
  try {
    const payload = { bookId, name };
    const response = await api.patch<BookResponse>(`/families/book`, payload);

    console.log("[PATCH] 책자 이름 변경 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("[PATCH] 책자 이름 변경 에러:", error);
    throw error;
  }
};

/* GET - 소식 책자 목록 */
export const getBookList = async (id: number) => {
  try {
    const response = await api.get<BookResponse>(`familes/${id}/books`);
    console.log(response.data);
    console.log("[GET] 소식 책자 목록: ", response.data);
    return response.data;
  } catch (error) {
    console.error("[GET] 소식 책자 목록 에러", error);
    throw error;
  }
};
