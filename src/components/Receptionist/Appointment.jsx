import { useRef, useState } from "react";
import { FaFilter, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AddAppointment from "./AddAppointment";
import { useCalendar } from "../../context/CalendarContext";
import { useGetAppointments } from "../../hooks/useGetAppointments";
import dayjs from "dayjs";
import AppointmentCard from "./AppointmentCard";

function Appointment() {
  const { selectedDate } = useCalendar();
  const { data: appointments = [], isLoading } = useGetAppointments({
    date: selectedDate.format("MM/DD/YYYY"),
  });

  const scrollRef = useRef(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - clientWidth
            : scrollLeft + clientWidth,
        behavior: "smooth",
      });
    }
  };

  const filteredAppointments = appointments
    .filter((appt) =>
      dayjs(appt.appointmentDate, "MM/DD/YYYY").isSame(selectedDate, "day")
    )
    .filter((appt) =>
      statusFilter === "All" ? true : appt.status === statusFilter
    );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
          <h2 className="text-lg font-semibold whitespace-nowrap">
            {selectedDate.format("MMMM D, YYYY")}
          </h2>

          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown((prev) => !prev)}
              className="flex items-center px-2 py-1 bg-gray-100 rounded border hover:bg-gray-200"
            >
              <FaFilter className="mr-1" />
              {statusFilter}
            </button>

            {showFilterDropdown && (
              <div className="absolute mt-2 bg-white border rounded shadow z-10 w-40">
                {[
                  "All",
                  "Scheduled",
                  "Completed",
                  "Re-Scheduled",
                  "Cancelled",
                ].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status);
                      setShowFilterDropdown(false);
                    }}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-shrink-0">
          <AddAppointment />
        </div>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : filteredAppointments.length === 0 ? (
        <p className="text-gray-500">No appointments for this day.</p>
      ) : (
        <div ref={scrollRef} className="flex gap-4 px-2 overflow-hidden">
          {filteredAppointments.map((appointment, index) => (
            <div key={index} className="flex-shrink-0">
              <AppointmentCard appt={appointment} />
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end mt-4 gap-2">
        <button
          onClick={() => scroll("left")}
          className="p-3 bg-gray-100 rounded-full border hover:bg-gray-200"
        >
          <FaChevronLeft size={16} className="text-gray-600" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="p-3 bg-gray-100 rounded-full border hover:bg-gray-200"
        >
          <FaChevronRight size={16} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}

export default Appointment;
