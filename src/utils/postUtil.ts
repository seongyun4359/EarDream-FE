import type { PostData } from "../types/post";
import type { Post } from "../types/feed";

const BASIC_URL = import.meta.env.VITE_IMAGE_BASE_URL;

export const mapPostDataToPost = (data: PostData[]): Post[] => {
  return data.map((p) => ({
    id: p.id.toString(),
    author: "김가족",
    authorId: 5,
    authorImage: "",
    timeAgo: new Date(p.createdAt).toLocaleDateString(),
    title: p.title,
    content: p.content,
    imageUrls: p.images.map((img) => `${BASIC_URL}${img.imageUrl}`),
    likes: 7,
    comments: 5,
    isNew: true,
  }));
};
