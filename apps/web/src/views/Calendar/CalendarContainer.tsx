import { useCallback, useEffect, useState } from "react";
import Calendar from "./Calendar";
import { useNavbarStore } from "@/store/useNavbarStore";
import toast from "react-hot-toast";
import { Event } from "@/interfaces/event.interface";
import { useCalendarStore } from "@/store/useCalendarStore";

const CalendarContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowAllModalOpen, setShowAllIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();

  const { events, createEvent, getEvents, editEvent, deleteEvent } = useCalendarStore();
  const { setVariant } = useNavbarStore();

  useEffect(() => {
    setVariant("dark");
    getEvents();
  }, [setVariant, getEvents]);

  const onClickHandler = useCallback(
    (day: number, month: number, year: number) => {
      const clickedDate = new Date(year, month, day);
      setSelectedDate(clickedDate);
      setShowAllIsModalOpen(true);
    },
    [setSelectedDate, setShowAllIsModalOpen]
  );

  const addEventClick = useCallback(
    (selectedDate = null) => {
      selectedDate ? setSelectedDate(selectedDate) : setSelectedDate(undefined);

      setIsModalOpen(true);
    },
    [setIsModalOpen]
  );

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

  const dayEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getDate() === selectedDate?.getDate() &&
      eventDate.getMonth() === selectedDate?.getMonth() &&
      eventDate.getFullYear() === selectedDate?.getFullYear()
    );
  });

  const handleDeleteEvent = useCallback(
    async (id: string) => {
      try {
        await deleteEvent(id);
        toast.success("Evento deletado com sucesso");
      } catch (error) {
        toast.error("Erro ao deletar evento");
      }
    },
    []
  );

  const handleSaveEdit = useCallback(
    async (data: { _id: string; title: string; description?: string }) => {
      try {
        await editEvent(data);
        toast.success("Evento editado com sucesso");
      } catch (error) {
        toast.error("Erro ao editar evento");
      }
    },
    []
  );

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
      handleDeleteEvent={handleDeleteEvent}
      handleSaveEdit={handleSaveEdit}
    />
  );
};

export default CalendarContainer;
