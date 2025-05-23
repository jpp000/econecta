import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { MESSAGES_EVENTS } from "@/constants/events";
import { axiosInstance } from "@/lib/axiosInstance";

interface PublicMessagePayload {
  text: string;
}

interface PrivateMessagePayload {
  receiverId: string;
  text: string;
}

interface Message {
  _id?: string;
  text: string;
  senderId: string;
  receiverId?: string | null;
  createdAt: string;
  edited?: boolean;
}

interface ChatStore {
  messages: Message[];
  isLoading: boolean;
  selectedChat: string | null;
  error: string | null;

  setSelectedChat: (chat: string | null) => void;
  getPublicChatMessages: () => Promise<void>;
  getPrivateChatMessages: (receiverId: string) => Promise<void>;
  sendPublicMessage: (messagePayload: PublicMessagePayload) => Promise<void>;
  sendPrivateMessage: (messagePayload: PrivateMessagePayload) => Promise<void>;
  subscribeMessage: () => void;
  unsubscribeMessage: () => void;
  clearMessages: () => void;
  setError: (error: string | null) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isLoading: false,
  selectedChat: null,
  error: null,

  setSelectedChat: (chat) => {
    set({ selectedChat: chat });
  },

  clearMessages: () => {
    set({ messages: [] });
  },

  setError: (error) => {
    set({ error });
  },

  getPublicChatMessages: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axiosInstance.get("/messages/public");
      set({ messages: data });
    } catch (error) {
      console.error("Error fetching public messages:", error);
      set({ error: "Failed to load public messages" });
    } finally {
      set({ isLoading: false });
    }
  },

  getPrivateChatMessages: async (receiverId: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = useAuthStore.getState().user;
      const userId = user?._id;

      if (!userId) {
        set({ error: "User not authenticated" });
        return;
      }

      const { data } = await axiosInstance.get(
        `/messages/private/${userId}/${receiverId}`
      );
      set({ messages: data });
    } catch (error) {
      console.error("Error fetching private messages:", error);
      set({ error: "Failed to load private messages" });
    } finally {
      set({ isLoading: false });
    }
  },

  sendPublicMessage: async (messagePayload: PublicMessagePayload) => {
    set({ isLoading: true, error: null });
    try {
      const socket = useAuthStore.getState().socket;
      if (!socket) {
        throw new Error("Socket not connected");
      }

      socket.emit(MESSAGES_EVENTS.SEND_PUBLIC_MESSAGE, messagePayload);

      const user = useAuthStore.getState().user;

      if (!user) return;

      const optimisticMessage: Message = {
        text: messagePayload.text,
        senderId: user._id,
        receiverId: null,
        createdAt: new Date().toISOString(),
      };

      set((state) => ({
        messages: [...state.messages, optimisticMessage],
      }));
    } catch (error) {
      console.error("Error sending public message:", error);
      set({ error: "Failed to send message" });
    } finally {
      set({ isLoading: false });
    }
  },

  sendPrivateMessage: async (messagePayload: PrivateMessagePayload) => {
    set({ isLoading: true, error: null });
    try {
      const socket = useAuthStore.getState().socket;
      if (!socket) throw new Error("Socket not connected");

      socket.emit(MESSAGES_EVENTS.SEND_PRIVATE_MESSAGE, messagePayload);

      const user = useAuthStore.getState().user;
      if (!user) return;

      const optimisticMessage: Message = {
        text: messagePayload.text,
        senderId: user._id,
        receiverId: messagePayload.receiverId,
        createdAt: new Date().toISOString(),
      };

      set((state) => ({
        messages: [...state.messages, optimisticMessage],
      }));
    } catch (error) {
      console.error("Error sending private message:", error);
      set({ error: "Failed to send message" });
    } finally {
      set({ isLoading: false });
    }
  },

  subscribeMessage: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) {
      console.error("Socket not connected");
      return;
    }

    socket.on(MESSAGES_EVENTS.RECEIVE_PRIVATE_MESSAGE, (message: Message) => {
      set((state) => ({
        messages: [...state.messages, message],
      }));
    });

    socket.on(MESSAGES_EVENTS.RECEIVE_PUBLIC_MESSAGE, (message: Message) => {
      set((state) => ({
        messages: [...state.messages, message],
      }));
    });
  },

  unsubscribeMessage: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off(MESSAGES_EVENTS.RECEIVE_PRIVATE_MESSAGE);
    socket.off(MESSAGES_EVENTS.RECEIVE_PUBLIC_MESSAGE);
  },
}));
