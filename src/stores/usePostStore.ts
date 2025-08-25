import { create } from "zustand";
import type { PostData } from "../types/post";

interface PostState {
  posts: PostData[];
  setPosts: (posts: PostData[]) => void;
  addPost: (post: PostData) => void;
  updatePost: (id: number, updatedPost: Partial<PostData>) => void;
  removePost: (id: number) => void;
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  setPosts: (posts: PostData[]) => set({ posts }),
  addPost: (post: PostData) =>
    set((state) => ({ posts: [post, ...state.posts] })),
  updatePost: (id: number, updatedPost: Partial<PostData>) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === id ? { ...p, ...updatedPost } : p
      ),
    })),
  removePost: (id: number) =>
    set((state) => ({
      posts: state.posts.filter((p) => p.id !== id),
    })),
}));
