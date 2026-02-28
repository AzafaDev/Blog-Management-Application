import { create } from "zustand";
import Backendless from "../lib/backendless";
import { toast } from "react-toastify";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  objectId: string;
  email: string;
};

interface UserStore {
  isLoading: boolean;
  currentUser: User | null;
  _hasHydrated: boolean;
  setHasHydrated: (state: any) => void;
  handleLogin: (credentials: {
    email: string;
    password: string;
  }) => Promise<void>;
  handleLogout: () => Promise<void>;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      isLoading: false,
      currentUser: null,
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      handleLogin: async (credentials) => {
        set({ isLoading: true });
        try {
          const loggedInUser = await Backendless.UserService.login(
            credentials.email,
            credentials.password,
          );
          toast.success("Login Successfully!");
          set({ currentUser: loggedInUser as User });
          const loginModal = document.getElementById(
            "login_modal",
          ) as HTMLDialogElement;
          loginModal.close();
        } catch (error: any) {
          console.log("Error in handleLogin: " + error.message);
          toast.error("Something went wrong!");
        } finally {
          set({ isLoading: false });
        }
      },
      handleLogout: async () => {
        set({ isLoading: true });
        try {
          await Backendless.UserService.logout();
          set({ currentUser: null });
          toast.success("Logout Successfully");
        } catch (error: any) {
          console.log("Error in handleLogout: " + error.message);
          toast.error("Something went wrong");
        } finally {
          set({ isLoading: false });
        }
      },
    }),

    {
      name: "current_user",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ currentUser: state.currentUser }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
