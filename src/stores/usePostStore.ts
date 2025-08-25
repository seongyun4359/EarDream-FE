import { create } from "zustand";
import type { PostData } from "../types/post";

interface PostState {
  posts: PostData[];
  setPosts: (posts: PostData[]) => void;
  addPost: (post: PostData) => void;
  updatePost: (id: number, updatedPost: Partial<PostData>) => void;
  removePost: (id: number) => void;
}

export const usePostStore = create<PostState>(
  (
    set: (arg0: {
      (state: any): { posts: any[] };
      (state: any): { posts: any };
      (state: any): { posts: any };
      posts?: any;
    }) => any
  ) => ({
    posts: [],
    setPosts: (posts: any) => set({ posts }),
    addPost: (post: any) =>
      set((state: { posts: any }) => ({ posts: [post, ...state.posts] })),
    updatePost: (id: any, updatedPost: any) =>
      set((state: { posts: any[] }) => ({
        posts: state.posts.map((p: { id: any }) =>
          p.id === id ? { ...p, ...updatedPost } : p
        ),
      })),
    removePost: (id: any) =>
      set((state: { posts: any[] }) => ({
        posts: state.posts.filter((p: { id: any }) => p.id !== id),
      })),
  })
);
