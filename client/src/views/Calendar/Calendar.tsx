import { ContinuousCalendar } from "@/components/ContinuousCalendar/ContinuousCalendar";
import { SustainableEventModal } from "@/components/Modals/AddEventModal";
import { DayEventsModal } from "@/components/Modals/DayEventsModal";
import { useNavbarStore } from "@/store/useNavbarStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Calendar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowAllModalOpen, setShowAllIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const { setVariant } = useNavbarStore();

  useEffect(() => {
    setVariant("dark");
  }, [setVariant]);

  const onClickHandler = (day: number, month: number, year: number) => {
    const clickedDate = new Date(year, month, day);
    setSelectedDate(clickedDate);
    setShowAllIsModalOpen(true);
  };

  const addEventClick = () => {
    setIsModalOpen(true);
  };

  const handleAddEvent = (eventData) => {
    const snackMessage = `Added event: ${eventData.title}`;

    setIsModalOpen(false);

    toast.success(snackMessage);

    console.log("Event added:", eventData);
  };

  return (
    <div className="flex justify-center items-center w-full bg-[#1E3A3A]">
      <ContinuousCalendar
        showAllEventsClick={onClickHandler}
        addEventClick={addEventClick}
      />

      <SustainableEventModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onAddEvent={handleAddEvent}
        selectedDate={selectedDate}
        isDateEditable={!selectedDate}
      />

      <DayEventsModal
        open={isShowAllModalOpen}
        onOpenChange={setShowAllIsModalOpen}
        selectedDate={new Date(selectedDate)}
        events={
          [
            {
              title: "Reunião importante",
              description: "Com time de produto",
              tags: [{ name: "trabalho", color: "green-500" }],
              date: new Date(2025, 3, 10), // 10 de abril de 2025
            },
            {
              title: "Aniversário",
              description: "Bolo e parabéns",
              tags: [{ name: "pessoal", color: "red-500" }],
              date: new Date(2025, 3, 10),
            },
            {
              title: "Reunião importante",
              description: "Com time de produto",
              tags: [{ name: "trabalho", color: "green-500" }],
              date: new Date(2025, 3, 10), // 10 de abril de 2025
            },
            {
              title: "Aniversário",
              description: "Bolo e parabéns",
              tags: [{ name: "pessoal", color: "red-500" }],
              date: new Date(2025, 3, 10),
            },
          ]}
      />
    </div>
  );
}

export default Calendar;
