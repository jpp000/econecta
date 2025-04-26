import { ContinuousCalendar } from "@/components/ContinuousCalendar/ContinuousCalendar";
import { AddEventModal } from "@/components/Modals/AddEventModal";
import { DayEventsModal } from "@/components/Modals/DayEventsModal";
import { Event } from "@/interfaces/event.interface";

interface CalendarProps {
  events: Event[];
  dayEvents: Event[];
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  isShowAllModalOpen: boolean;
  setShowAllIsModalOpen: (isOpen: boolean) => void;
  selectedDate?: Date | null;
  setSelectedDate: any;
  onClickHandler: (day: number, month: number, year: number) => void;
  addEventClick: any;
  handleAddEvent: (eventData: Omit<Event, "_id">) => void;
}

const Calendar = ({
  events,
  dayEvents,
  isModalOpen,
  setIsModalOpen,
  isShowAllModalOpen,
  setShowAllIsModalOpen,
  selectedDate,
  onClickHandler,
  addEventClick,
  handleAddEvent,
}: CalendarProps) => {
  const handleAddEventClick = () => {
    setIsModalOpen(true);
  };


  return (
    <div className="flex justify-center items-center w-full bg-[#1E3A3A]">
      <ContinuousCalendar
        showAllEventsClick={onClickHandler}
        addEventClick={handleAddEventClick}
        events={events}
      />

      <AddEventModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onAddEvent={handleAddEvent}
        selectedDate={selectedDate}
        isDateEditable={!selectedDate}
      />

      <DayEventsModal
        open={isShowAllModalOpen}
        onOpenChange={setShowAllIsModalOpen}
        selectedDate={selectedDate}
        events={dayEvents}
      />
    </div>
  );
};

export default Calendar;
