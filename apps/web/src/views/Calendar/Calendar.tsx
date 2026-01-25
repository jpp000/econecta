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
  handleDeleteEvent: (id: string) => void;
  handleSaveEdit: (data: { _id: string; title: string; description?: string }) => void;
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
  handleDeleteEvent,
  handleSaveEdit,
}: CalendarProps) => {
  return (
    <div className="h-[calc(100vh-3rem)] flex justify-center items-center w-full bg-[#1E3A3A]">
      <ContinuousCalendar
        showAllEventsClick={onClickHandler}
        addEventClick={addEventClick}
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
        handleDeleteEvent={handleDeleteEvent}
        handleSaveEdit={handleSaveEdit}
      />
    </div>
  );
};

export default Calendar;
