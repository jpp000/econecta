import { Event } from "@/interfaces/event.interface";
import { axiosInstance } from "@/lib/axiosInstance";
import { create } from "zustand";

type CalendarStore = {
    events: Event[];
    createEvent: (event: Omit<Event, "_id">) => Promise<Event>;
    removeEvent: (id: string) => void;
};

export const useCalendarStore = create<CalendarStore>((set) => ({
    events: [],

    createEvent: async (event: Omit<Event, "_id">) => {
        const res = await axiosInstance.post("/calendar", {
            ...event,
        });

        const newEvent: Event = res.data;

        set((state) => ({
            events: [...state.events, newEvent],
        }));

        return newEvent;
    },
    
    removeEvent: (id: string) => {
        set((state) => ({
            events: state.events.filter((event) => event._id !== id),
        }));
    },
}))