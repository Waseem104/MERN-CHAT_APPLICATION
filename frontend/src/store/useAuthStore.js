import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const Base_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8080"
    : window.location.origin;

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const { data } = await axiosInstance.get("/auth/check");
      if (data?.success) {
        set({ authUser: data?.user });
        get().connectSocket();
      } else {
        set({ authUser: null });
      }
    } catch (error) {
      console.error("Error in checkAuth: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (formData) => {
    set({ isSigningUp: true });
    try {
      const { data } = await axiosInstance.post("/auth/signup", formData);
      if (data?.success) {
        set({ authUser: data?.user });
        toast.success(data?.message);
        get().connectSocket();
      } else {
        set({ authUser: null });
        toast.error(data?.message || "Failed to sign up");
      }
    } catch (error) {
      console.error("Error in sign up axios: ", error);
      toast.error(error.response?.data?.message || "Error in sign up axios");
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    const { authUser, disconnectSocket } = get();
    if (!authUser) return;
    try {
      const { data } = await axiosInstance.post("/auth/logout");
      if (data?.success) {
        set({ authUser: null });
        toast.success(data?.message);
        disconnectSocket();
      } else {
        toast.error(data?.message || "Failed to log out");
      }
    } catch (error) {
      console.error("Error in logout function: ", error);
      toast.error(error.response?.data?.message || "Error in logout function");
    }
  },

  login: async (formData) => {
    set({ isLoggingIn: true });
    try {
      const { data } = await axiosInstance.post("/auth/login", formData);
      if (data?.success) {
        set({ authUser: data?.user });
        toast.success(data?.message);
        get().connectSocket();
      } else {
        set({ authUser: null });
        toast.error(data?.message || "Failed to log in");
      }
    } catch (error) {
      console.error("Error in login function: ", error);
      toast.error(error.response?.data?.message || "Error in login function");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updateProfile: async (imageData) => {
    set({ isUpdatingProfile: true });
    try {
      const { data } = await axiosInstance.put(
        "/auth/update-profile",
        imageData
      );
      if (data?.success) {
        set({ authUser: data?.user });
        toast.success(data?.message);
      }
    } catch (error) {
      console.log("Error in updateProfile function ", error.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(Base_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
