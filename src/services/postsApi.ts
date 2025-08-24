import axios from "axios";
import type { PostResponse } from "../types/post";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

/* GET - 그룹 소식 목록 */
export const getFamilyPosts = async (id: number) => {
  try {
    const response = await api.get<PostResponse>(`familes/${id}/posts`);
    console.log("[GET] 그룹 소식 목록: ", response.data);
    return response.data;
  } catch (error) {
    console.error("[GET] 그룹 소식 목록 에러", error);
    throw error;
  }
};

/* POST - 소식 작성 */
export const writePost = async (
  familyId: number,
  userId: number,
  title: string,
  content?: string,
  images?: File[]
) => {
  const formData = new FormData();
  formData.append("userId", String(userId));
  formData.append("title", title);
  if (content) formData.append("content", content);

  if (images && images.length > 0) {
    images.forEach((img) => formData.append("images", img));
  }

  try {
    const response = await api.post<PostResponse>(
      `/familes/${familyId}/posts`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("[POST] 게시글 등록 성공: ", response.data);
    return response.data;
  } catch (error) {
    console.log("[POST] 게시글 등록 에러", error);
  }
};

/* GET - 소식 상세 */
export const getPostDetails = async (id: number) => {
  try {
    const response = await api.get<PostResponse>(`/posts/${id}`);
    console.log("[GET] 소식 상세: ", response.data);
    return response.data;
  } catch (error) {
    console.error("[GET] 소식 상세 에러", error);
    throw error;
  }
};

/* DELETE - 소식 삭제 */
export const deletePost = async (id: number) => {
  try {
    const response = await api.delete<PostResponse>(`/posts/${id}`);
    console.log(response.data);
    console.log("[DELETE] 소식 삭제: ", response.data);
    return response.data;
  } catch (error) {
    console.error("[DELETE] 소식 삭제 에러", error);
    throw error;
  }
};

/* POST - 소식 수정 */
export const patchPosts = async (
  id: number,
  title: string,
  content?: string,
  images?: File[]
) => {
  const formData = new FormData();

  formData.append("title", title);
  if (content) formData.append("content", content);
  if (images && images.length > 0) {
    images.forEach((image) => {
      formData.append("images", image);
    });
  }

  try {
    const response = await api.patch<PostResponse>(`/posts/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("[PATCH] 소식 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("[PATCH] 소식 수정 에러:", error);
    throw error;
  }
};
