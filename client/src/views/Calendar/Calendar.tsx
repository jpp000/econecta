import { ContinuousCalendar } from "@/components/ContinuousCalendar/ContinuousCalendar";
import { useNavbarStore } from "@/store/useNavbarStore";
import { useEffect } from "react";
import toast from "react-hot-toast";

function Calendar() {
  const onClickHandler = (day: number, month: number, year: number) => {
    const snackMessage = `Clicked on ${month} ${day}, ${year}`;
    toast.success(snackMessage);
  };

  const addEventClick = () => {
    const snackMessage = `Clicked on Add Event`;
    toast.success(snackMessage);
  }

  const { setVariant } = useNavbarStore()
  
  useEffect(() => {
    setVariant('dark')
  }, [setVariant])

  return (
    <div className="flex justify-center items-center w-full bg-[#1E3A3A]">
      <ContinuousCalendar onClick={onClickHandler} addEventClick={addEventClick} />
    </div>
  );
}

export default Calendar;
