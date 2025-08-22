export interface Post {
  id: string;
  author: string;
  authorImage: string;
  timeAgo: string;
  title: string;
  content: string;
  imageUrl?: string;
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
