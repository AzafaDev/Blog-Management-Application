import { create } from "zustand";
import Backendless from "../lib/backendless";
import { toast } from "react-toastify";
import { createJSONStorage, persist } from "zustand/middleware";

export type Blog = {
  objectId: string;
  title: string;
  author: string;
  content: string;
  publishedDate: number;
};

interface BlogStore {
  isLoading: boolean;
  selectedPost: Blog | null;
  currentBlogs: Blog[] | null;
  fetchBlogs: () => Promise<void>;
  postBlog: ({
    title,
    author,
    content,
    date,
  }: {
    title: string;
    author: string;
    content: string;
    date: number;
  }) => Promise<void>;
  updateBlog: ({
    objectId,
    title,
    author,
    content,
    publishedDate,
  }: Blog) => Promise<void>;
  deleteBlog: (objectId: string) => Promise<void>;
  setSelectedPost: (post: Blog) => void;
}

export const useBlogStore = create<BlogStore>()(
  persist(
    (set, get) => ({
      isLoading: false,
      currentBlogs: null,
      selectedPost: null,
      setSelectedPost: (post) => {
        set({ selectedPost: post });
      },
      fetchBlogs: async () => {
        set({ isLoading: true });
        try {
          const blogs = await Backendless.Data.of("Blog").find();
          set({ currentBlogs: blogs as Blog[] });
        } catch (error: any) {
          console.log(error.message);
        } finally {
          set({ isLoading: false });
        }
      },
      postBlog: async ({ title, author, content, date }) => {
        set({ isLoading: true });
        try {
          await Backendless.Data.of("Blog").save({
            title,
            author,
            content,
            date,
          });
          toast.success("Created post successfully!");
          get().fetchBlogs();
        } catch (error) {
          console.log("Error in postBlog: ", error);
          toast.error("Something went wrong!");
        } finally {
          set({ isLoading: false });
        }
      },
      updateBlog: async ({
        objectId,
        title,
        author,
        content,
        publishedDate,
      }) => {
        set({ isLoading: true });
        try {
          await Backendless.Data.of("Blog").save({
            objectId,
            title,
            author,
            content,
            publishedDate,
          });
          toast.success("Updated post successfully!");
          get().fetchBlogs();
        } catch (error: any) {
          console.log(error.message);
          toast.error("Something went wrong");
        } finally {
          set({ isLoading: false });
        }
      },
      deleteBlog: async (objectId) => {
        set({ isLoading: true });
        try {
          await Backendless.Data.of("Blog").remove(objectId);
          toast.success("Deleted post successfully");
          get().fetchBlogs();
        } catch (error: any) {
          console.log(error.message);
          toast.error("Something went wrong");
        } finally {
          set({ isLoading: false });
          (
            document.getElementById("delete_modal") as HTMLDialogElement
          ).close();
        }
      },
    }),
    {
      name: "blog-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
