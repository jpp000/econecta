import { create } from "zustand";

export const useChatStore = create((set) => ({
  socket: null,

  setSocket: (socket: any) => {
    set({ socket });
  },
}));
