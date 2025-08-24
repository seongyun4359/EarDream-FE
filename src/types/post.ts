export interface PostImage {
  id: number;
  imageUrl: string;
  imageOrder: number;
}

export interface PostData {
  id: number;
  familyId: number;
  userId: number;
  title: string;
  content: string;
  postMonth: string;
  createdAt: string;
  updatedAt: string;
  images: PostImage[];
}

export interface PostResponse {
  success: boolean;
  data: PostData[];
  message: string;
  errorCode: string | null;
  timestamp: string;
}
