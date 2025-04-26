import { useCallback, useEffect, useMemo, useState } from "react";
import Calendar from "./Calendar";
import { useNavbarStore } from "@/store/useNavbarStore";
import toast from "react-hot-toast";
import { Event } from "@/interfaces/event.interface";
import { useCalendarStore } from "@/store/useCalendarStore";

const CalendarContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowAllModalOpen, setShowAllIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();

  const { events, createEvent } = useCalendarStore();
  const { setVariant } = useNavbarStore();

  useEffect(() => {
    setVariant("dark");
  }, [setVariant]);

  const onClickHandler = useCallback(
    (day: number, month: number, year: number) => {
      const clickedDate = new Date(year, month, day);
      setSelectedDate(clickedDate);
      setShowAllIsModalOpen(true);
    },
    [setSelectedDate, setShowAllIsModalOpen]
  );

  const addEventClick = () => {    
    setIsModalOpen(true);
  };

  const handleAddEvent = useCallback(
    async (eventData: Omit<Event, "_id">) => {
      try {
        const eventCreated = await createEvent(eventData);

        setIsModalOpen(false);
        toast.success(`Evento adicionado: ${eventCreated.title}`);
      } catch (error) {
        toast.error("Erro ao adicionar evento");
      }
    },
    [createEvent, setIsModalOpen]
  );

  const dayEvents = useMemo(() => {
    if (!selectedDate) return [];

    return events.filter(
      (event) =>
        event.date.getDate() === selectedDate.getDate() &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear()
    );
  }, [selectedDate, events]);

  return (
    <Calendar
      events={events}
      dayEvents={dayEvents}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      isShowAllModalOpen={isShowAllModalOpen}
      setShowAllIsModalOpen={setShowAllIsModalOpen}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      onClickHandler={onClickHandler}
      addEventClick={addEventClick}
      handleAddEvent={handleAddEvent}
    />
  );
};

export default CalendarContainer;
