export interface Post {
  id: number;
  authorId?: number;
  author: string;
  authorImage: string;
  timeAgo: string;
  title: string;
  content: string;
  imageUrls?: string[];
  likes: number;
  comments: number;
  isNew: boolean;
}

export interface CommentType {
  author: string;
  authorImage: string;
  content: string;
  createdAt: string;
}
