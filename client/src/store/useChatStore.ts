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
  id: string;
  text: string;
  senderId: string;
  receiverId?: string | null;
  createdAt: string;
}

interface ChatStore {
  messages: Message[];
  incomeMessages: Message[];
  isLoading: boolean;
  selectedChat: any;

  setSelectedChat: (chat: any) => void;
  getPublicChatMessages: () => Promise<void>;
  getPrivateChatMessages: (receiverId: string) => Promise<void>;
  sendPublicMessage: (messagePayload: PublicMessagePayload) => Promise<void>;
  sendPrivateMessage: (messagePayload: PrivateMessagePayload) => Promise<void>;
  subscribeMessage: () => void;
  unsubscribeMessage: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  incomeMessages: [],
  isLoading: false,
  selectedChat: null,

  setSelectedChat: (chat) => {
    set({ selectedChat: chat });
  },

  getPublicChatMessages: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axiosInstance.get("/messages/public");
      set({ messages: data });
    } catch (error) {
      console.error("Error fetching public messages:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  getPrivateChatMessages: async (receiverId: string) => {
    set({ isLoading: true });
    try {
      const user = useAuthStore.getState().user;
      const userId = user?.id;

      if (!userId) {
        console.log("User ID not found");
        return;
      }

      const { data } = await axiosInstance.get(
        `/messages/private/${userId}/${receiverId}`
      );
      set({ messages: data });
    } catch (error) {
      console.error("Error fetching private messages:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  sendPublicMessage: async (messagePayload: PublicMessagePayload) => {
    set({ isLoading: true });
    try {
      const socket = useAuthStore.getState().socket;
      if (!socket) throw new Error("Socket not connected");

      socket.emit(MESSAGES_EVENTS.SEND_PUBLIC_MESSAGE, messagePayload);

      const message = {
        ...messagePayload,
        createdAt: new Date().toISOString(),
      } as Message;

      set((state) => ({
        incomeMessages: [...state.incomeMessages, message],
      }));
    } catch (error) {
      console.error("Error sending public message:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  sendPrivateMessage: async (messagePayload: PrivateMessagePayload) => {
    set({ isLoading: true });
    try {
      const socket = useAuthStore.getState().socket;
      if (!socket) throw new Error("Socket not connected");

      socket.emit(MESSAGES_EVENTS.SEND_PRIVATE_MESSAGE, messagePayload);

      const message = {
        ...messagePayload,
        createdAt: new Date().toISOString(),
      } as Message;

      set((state) => ({
        incomeMessages: [...state.incomeMessages, message],
      }));
    } catch (error) {
      console.error("Error sending private message:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  subscribeMessage: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) throw new Error("Socket not connected");

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
    if (!socket) throw new Error("Socket not connected");

    socket.off(MESSAGES_EVENTS.RECEIVE_PRIVATE_MESSAGE);
    socket.off(MESSAGES_EVENTS.RECEIVE_PUBLIC_MESSAGE);
  },
}));
