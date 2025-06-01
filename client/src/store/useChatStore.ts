import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { MESSAGES_EVENTS } from "@/constants/events";
import { axiosInstance } from "@/lib/axiosInstance";
import {
  ChatUser,
  Message,
  SendPrivateMessagePayload,
  SendPublicMessagePayload,
  EditMessagePayload,
} from "@/interfaces/message.interface";

interface ChatStore {
  messages: Message[];
  isLoading: boolean;
  selectedChat: ChatUser | null;
  error: string | null;

  setSelectedChat: (chat: ChatUser | null) => Promise<void>;
  getPublicChatMessages: () => Promise<void>;
  getPrivateChatMessages: (receiverId: string) => Promise<void>;
  sendPublicMessage: (messagePayload: SendPublicMessagePayload) => void;
  sendPrivateMessage: (messagePayload: SendPrivateMessagePayload) => void;
  editMessage: (editMessagePayload: EditMessagePayload) => void;
  deleteMessage: (messageId: string) => void;
  subscribeMessage: () => void;
  unsubscribeMessage: () => void;
  setError: (error: string | null) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  isLoading: false,
  selectedChat: null,
  error: null,

  setSelectedChat: async (chat: ChatUser | null) => {
    set({ selectedChat: chat });

    if (chat?._id) {
      await useChatStore.getState().getPrivateChatMessages(chat._id);
      return;
    }

    await useChatStore.getState().getPublicChatMessages();
  },

  setError: (error) => {
    set({ error });
  },

  getPublicChatMessages: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axiosInstance.get("/messages/public");
      set({ messages: data });
    } catch {
      set({ error: "Erro ao carregar mensagens" });
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
    } catch {
      set({ error: "Erro ao carregar mensagens" });
    } finally {
      set({ isLoading: false });
    }
  },

  sendPublicMessage: (messagePayload: SendPublicMessagePayload) => {
    set({ isLoading: true, error: null });
    try {
      const socket = useAuthStore.getState().socket;

      if (!socket) {
        throw new Error("Socket not connected");
      }

      socket.emit(MESSAGES_EVENTS.SEND_PUBLIC_MESSAGE, messagePayload);
    } catch {
      set({ error: "Erro ao enviar mensagem" });
    } finally {
      set({ isLoading: false });
    }
  },

  sendPrivateMessage: (messagePayload: SendPrivateMessagePayload) => {
    set({ isLoading: true, error: null });
    try {
      const socket = useAuthStore.getState().socket;
      if (!socket) throw new Error("Socket not connected");

      socket.emit(MESSAGES_EVENTS.SEND_PRIVATE_MESSAGE, messagePayload);
    } catch {
      set({ error: "Erro ao enviar mensagem" });
    } finally {
      set({ isLoading: false });
    }
  },

  editMessage: (editMessagePayload: EditMessagePayload) => {
    set({ isLoading: true, error: null });
    try {
      const socket = useAuthStore.getState().socket;
      if (!socket) throw new Error("Socket not connected");

      const { messages } = get();
      const currentUserId = useAuthStore.getState().user?._id;

      const message = messages.find(
        (message) =>
          message._id === editMessagePayload.messageId &&
          message.sender._id === currentUserId
      );

      if (!message) {
        throw new Error("User is not the sender of the message");
      }

      if (message.text === editMessagePayload.text) return;

      socket.emit(MESSAGES_EVENTS.EDIT_MESSAGE, editMessagePayload);
    } catch {
      set({ error: "Erro ao editar mensagem" });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteMessage: (messageId: string) => {
    set({ isLoading: true, error: null });
    try {
      const socket = useAuthStore.getState().socket;
      if (!socket) throw new Error("Socket not connected");

      const { messages } = get();
      const currentUserId = useAuthStore.getState().user?._id;

      const userIsSender = messages.find(
        (message) =>
          message._id === messageId && message.sender._id === currentUserId
      );

      if (!userIsSender) {
        throw new Error("User is not the sender of the message");
      }

      socket.emit(MESSAGES_EVENTS.DELETE_MESSAGE, messageId);
    } catch {
      set({ error: "Erro ao deletar mensagem" });
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
      const selectedChat = get().selectedChat

      console.log({ selectedChat, message });

      if(selectedChat) {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      }

    });

    socket.on(MESSAGES_EVENTS.RECEIVE_PUBLIC_MESSAGE, (message: Message) => {
      const { selectedChat } = get();

      if(!selectedChat) {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      }
    });

    socket.on(MESSAGES_EVENTS.EDITED_MESSAGE, (editedMessage: Message) => {
      const { messages } = get();
      const messageIdx = messages.findIndex(
        (message) => message._id === editedMessage._id
      );

      const newMessages = messages;

      newMessages.splice(messageIdx, 1);
      newMessages.push(editedMessage);

      set({ messages: newMessages });
    });

    socket.on(MESSAGES_EVENTS.DELETED_MESSAGE, (messageId: string) => {
      const { messages } = get();

      const index = messages.findIndex((message) => message._id === messageId);

      if (index === -1) return;

      const updatedMessages = messages;

      updatedMessages.splice(index, 1);

      set({ messages: updatedMessages });
    });
  },

  unsubscribeMessage: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off(MESSAGES_EVENTS.RECEIVE_PRIVATE_MESSAGE);
    socket.off(MESSAGES_EVENTS.RECEIVE_PUBLIC_MESSAGE);
  },
}));
