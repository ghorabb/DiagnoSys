import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useMediaQuery } from "react-responsive";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCalendar } from "../context/CalendarContext"; // adjust path if needed

const CustomCalendar = () => {
  const { selectedDate, setSelectedDate } = useCalendar();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [visibleDays, setVisibleDays] = useState([]);

  useEffect(() => {
    updateVisibleDays(selectedDate);
  }, [selectedDate, isMobile]);

  const handleDateChange = (date) => {
    setSelectedDate(dayjs(date));
  };

  const updateVisibleDays = (date) => {
    const days = isMobile
      ? [
          date.clone().subtract(1, "day"),
          date.clone(),
          date.clone().add(1, "day"),
        ]
      : Array.from({ length: 15 }, (_, i) => date.clone().add(i - 7, "day"));
    setVisibleDays(days);
  };

  const goToPreviousDay = () =>
    setSelectedDate(selectedDate.subtract(1, "day"));
  const goToNextDay = () => setSelectedDate(selectedDate.add(1, "day"));

  return (
    <div className="w-full h-[100px] bg-[linear-gradient(180deg,rgba(204,208,248,0.42)_6%,rgba(204,208,248,0)_100%)] rounded-xl shadow-md p-3 flex items-center justify-between">
      <button
        className="p-2 rounded-full bg-customBlue text-white"
        onClick={goToPreviousDay}
      >
        <ChevronLeft size={18} />
      </button>
      <div className="flex items-center justify-center gap-2">
        {visibleDays.map((day, i) => (
          <div
            key={i}
            className={`w-8 h-12 flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all ${
              selectedDate.isSame(day, "day")
                ? "bg-customBlue text-white scale-105 shadow-md"
                : "hover:bg-gray-200"
            }`}
            onClick={() => handleDateChange(day)}
          >
            <span className="text-xs font-semibold text-gray-600">
              {day.format("ddd")}
            </span>
            <span className="text-sm font-bold">{day.format("D")}</span>
          </div>
        ))}
      </div>
      <button
        className="p-2 rounded-full bg-customBlue text-white"
        onClick={goToNextDay}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default CustomCalendar;
