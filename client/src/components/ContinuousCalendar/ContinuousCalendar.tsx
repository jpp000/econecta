import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { SingleEventModal } from "../Modals/EventModal";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface ContinuousCalendarProps {
  onClick?: (_day: number, _month: number, _year: number) => void;
  addEventClick?: () => void;
  showAllEventsClick: any;
}

export const ContinuousCalendar: React.FC<ContinuousCalendarProps> = ({
  addEventClick,
  showAllEventsClick,
}) => {
  const today = new Date();
  const dayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const visibleMonthIndex = currentDate.getMonth();
  const monthOptions = monthNames.map((month, index) => ({
    name: month,
    value: `${index}`,
  }));

  const scrollToDay = (monthIndex: number, dayIndex: number) => {
    const targetDayIndex = dayRefs.current.findIndex(
      (ref) =>
        ref &&
        ref.getAttribute("data-month") === `${monthIndex}` &&
        ref.getAttribute("data-day") === `${dayIndex}`
    );

    const targetElement = dayRefs.current[targetDayIndex];

    if (targetDayIndex !== -1 && targetElement) {
      const container = document.querySelector(".calendar-container");
      const elementRect = targetElement.getBoundingClientRect();
      const is2xl = window.matchMedia("(min-width: 1536px)").matches;
      const offsetFactor = is2xl ? 3 : 2.5;

      if (container) {
        const containerRect = container.getBoundingClientRect();
        const offset =
          elementRect.top -
          containerRect.top -
          containerRect.height / offsetFactor +
          elementRect.height / 2;

        container.scrollTo({
          top: container.scrollTop + offset,
          behavior: "smooth",
        });
      } else {
        const offset =
          window.scrollY +
          elementRect.top -
          window.innerHeight / offsetFactor +
          elementRect.height / 2;

        window.scrollTo({
          top: offset,
          behavior: "smooth",
        });
      }
    }
  };

  const handleTodayClick = () => {
    const today = new Date();
    setCurrentDate(today);
    scrollToDay(today.getMonth(), today.getDate());
  };

  const handleDayClick = (day: number, month: number, year: number) => {
    if (!showAllEventsClick) return;
    if (month < 0) {
      showAllEventsClick(day, 11, year - 1);
    } else {
      showAllEventsClick(day, month, year);
    }
  };

  const getDaysInMonth = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const days = [];
    const startDay = date.getDay();
    for (let i = 0; i < startDay; i++) {
      days.push({ day: null, month });
    }
    const totalDays = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= totalDays; i++) {
      days.push({ day: i, month });
    }
    return days;
  };

  const events = [
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
  ];

  const generateCalendar = useMemo(() => {
    const today = new Date();
    const currentMonth = visibleMonthIndex;
    const monthName = monthNames[currentMonth];
    const days = getDaysInMonth(year, currentMonth);

    return (
      <div key={currentMonth} className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-green-950 sm:text-2xl">
          {monthName} {year}
        </h2>
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {days.map(({ day }, index) => {
            const isToday =
              today.getFullYear() === year &&
              today.getMonth() === currentMonth &&
              today.getDate() === day;

            const dayEvents = events.filter(
              (event) =>
                day !== null &&
                event.date.getDate() === day &&
                event.date.getMonth() === currentMonth &&
                event.date.getFullYear() === year
            );

            return (
              <div
                key={`${currentMonth}-${day}-${index}`}
                onClick={() => day && handleDayClick(day, currentMonth, year)}
                ref={(el) => {
                  if (day !== null) dayRefs.current[index] = el;
                }}
                data-day={day ?? undefined}
                data-month={currentMonth}
                className={`relative z-10 aspect-square w-full rounded-xl border text-sm font-medium transition-all hover:z-20 hover:border-green-800 sm:rounded-2xl sm:border-2 sm:text-base lg:rounded-3xl ${
                  day ? "text-slate-800" : "invisible"
                }`}
              >
                <span
                  className={`absolute left-1 top-1 flex size-5 items-center justify-center rounded-full text-xs sm:size-6 sm:text-sm lg:left-2 lg:top-2 lg:size-8 lg:text-base ${
                    isToday
                      ? "bg-green-800 font-semibold text-white"
                      : "text-slate-800"
                  }`}
                >
                  {day}
                </span>

                <button
                  onClick={addEventClick}
                  className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-slate-600/80 text-white hover:bg-green-900/90 sm:h-8 sm:w-8 cursor-pointer transition-all duration-200 ease-in-out"
                  title="Add Event"
                >
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                <div
                  className={`mt-14 flex flex-col gap-2 overflow-y-auto px-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-400`}
                  style={{ maxHeight: "4.5rem" }}
                >
                  {dayEvents.slice(0, 2).map((event, i) => (
                    <EventCard
                      key={`${day}-${event.title}-${i}`}
                      title={event.title}
                      description={event.description}
                      tags={event.tags || []}
                      tagColor={event.tags[0]?.color || "green-500"}
                      date={new Date(event.date)}
                    />
                  ))}
                  {dayEvents.length > 2 && (
                    <span className="ml-2 text-xs text-slate-600/80">
                      +{dayEvents.length - 2} evento(s)
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [year, visibleMonthIndex]);

  useEffect(() => {
    const calendarContainer = document.querySelector(".calendar-container");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const month = parseInt(
              entry.target.getAttribute("data-month")!,
              10
            );
            // Placeholder for possible visible month tracking logic
          }
        });
      },
      {
        root: calendarContainer,
        rootMargin: "-75% 0px -25% 0px",
        threshold: 0,
      }
    );

    dayRefs.current.forEach((ref) => {
      if (ref && ref.getAttribute("data-day") === "15") {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [year, visibleMonthIndex]);

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
  };

  const handlePrevYear = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(prevDate.getFullYear() - 1);
      return newDate;
    });
  };

  const handleNextYear = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(prevDate.getFullYear() + 1);
      return newDate;
    });
  };

  return (
    <div className="flex h-[820px] w-[92vw] mt-20 mb-15 overflow-hidden rounded-2xl bg-white text-slate-800 shadow-xl">
      <div className="w-72 shrink-0 overflow-y-auto border-r border-slate-200 bg-white sm:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevMonth}
                className="rounded-full border p-1.5 text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <Select
                name="visibleMonth"
                value={`${visibleMonthIndex}`}
                options={monthOptions}
                onChange={(event) => {
                  const index = parseInt(event.target.value, 10);
                  setCurrentDate((prevDate) => {
                    const newDate = new Date(prevDate);
                    newDate.setMonth(index);
                    return newDate;
                  });
                }}
              />
              <button
                onClick={handleNextMonth}
                className="rounded-full border p-1.5 text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleTodayClick}
              type="button"
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 cursor-pointer"
            >
              Today
            </button>
            <button
              type="button"
              className="whitespace-nowrap rounded-lg bg-gradient-to-r from-[#1E3A3A] to-green-800 px-3 py-2 text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:green-800 cursor-pointer"
              onClick={addEventClick}
            >
              + Add Event
            </button>
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handlePrevYear}
              className="rounded-full border p-2 hover:bg-slate-100 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5 text-slate-800" />
            </button>
            <h1 className="text-lg font-semibold">{year}</h1>
            <button
              onClick={handleNextYear}
              className="rounded-full border p-2 hover:bg-slate-100 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5 text-slate-800" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto calendar-container px-5 sm:p-6">
        <div className="grid grid-cols-7 justify-between text-slate-500 mb-2">
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className="w-full border-b border-slate-200 py-2 text-center font-semibold"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="w-full pt-4 sm:pt-6">{generateCalendar}</div>
      </div>
    </div>
  );
};

export interface SelectProps {
  name: string;
  value: string;
  label?: string;
  options: { name: string; value: string }[];
  onChange: (_event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export const Select = ({
  name,
  value,
  label,
  options = [],
  onChange,
  className,
}: SelectProps) => (
  <div className={`relative ${className}`}>
    {label && (
      <label htmlFor={name} className="mb-2 block font-medium text-slate-800">
        {label}
      </label>
    )}
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="cursor-pointer rounded-lg border border-gray-300 bg-white py-1.5 pl-2 pr-6 text-sm font-medium text-gray-900 hover:bg-gray-100 sm:rounded-xl sm:py-2.5 sm:pl-3 sm:pr-8"
      required
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
);

interface EventCardProps {
  title: string;
  tagColor: string;
  description?: string;
  tags?: { name: string; color: string }[];
  date?: Date;
  onOpenEvent?: (
    event: Omit<EventCardProps, "onOpenEvent" | "tagColor">
  ) => void;
}

const EventCard = ({
  title,
  tagColor,
  description,
  tags,
  date,
}: EventCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div
        className={`mx-1 w-9/10 cursor-pointer rounded-md border-l-4 bg-slate-100 px-1 py-0.5 text-[10px] sm:text-xs truncate border-${tagColor}`}
        onClick={handleClick}
        title={title}
      >
        {title}
      </div>
      <SingleEventModal
        open={isOpen}
        onOpenChange={setIsOpen}
        event={{
          title,
          description,
          tags,
          date,
        }}
      />
    </>
  );
};
