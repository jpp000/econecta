import { Event } from "@/interfaces/event.interface";
import { axiosInstance } from "@/lib/axiosInstance";
import toast from "react-hot-toast";
import { create } from "zustand";

type CalendarStore = {
  events: Event[];
  getEvents: () => Promise<Event[]>;
  createEvent: (event: Omit<Event, "_id">) => Promise<Event>;
  deleteEvent: (id: string) => void;
  editEvent: (event: {
    _id: string;
    title: string;
    description?: string;
  }) => Promise<Event>;
};

export const useCalendarStore = create<CalendarStore>((set) => ({
  events: [],

  getEvents: async () => {
    const res = await axiosInstance.get("/calendar");
    const events: Event[] = res.data.map((event: Event) => ({
      ...event,
      date: new Date(event.date),
    }));

    set({ events });

    return events;
  },

  createEvent: async (event: Omit<Event, "_id">) => {
    const res = await axiosInstance.post("/calendar", {
      ...event,
    });

    const newEvent: Event = res.data;

    set((state) => ({
      events: [...state.events, { ...newEvent, date: new Date(newEvent.date) }],
    }));

    return newEvent;
  },

  editEvent: async (event: {
    _id: string;
    title: string;
    description?: string;
  }) => {
    const res = await axiosInstance.put(`/calendar/${event._id}`, {
      ...event,
    });

    const updatedEvent = res.data;

    set((state) => ({
      events: state.events.map((e) => {
        if (e._id === updatedEvent._id) {
          return { ...e, ...updatedEvent, date: new Date(updatedEvent.date) };
        }
        return e;
      }),
    }));

    return updatedEvent;
  },

  deleteEvent: async (id: string) => {
    try {
      await axiosInstance.delete(`/calendar/${id}`);

      set((state) => ({
        events: state.events.filter((event) => event._id !== id),
      }));
    } catch (error) {
      toast.error("Erro ao deletar evento");
    }
  },
}));
