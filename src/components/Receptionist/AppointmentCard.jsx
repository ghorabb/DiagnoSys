import dayjs from "dayjs";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { useDeleteAppointment } from "../../hooks/useDeleteAppointment";
import EditAppointment from "./EditAppointment";

function AppointmentCard({ appt }) {
  const { mutate: cancelAppointment, isLoading } = useDeleteAppointment();

  const handleCancel = () => {
    if (!appt._id) return;
    const confirm = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );
    if (confirm) {
      cancelAppointment(appt._id);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-gray-100 w-full min-w-[340px]">
      <h3 className="text-md font-semibold flex items-center gap-2 whitespace-nowrap">
        <img
          alt=""
          src={appt.doctor?.profileImage?.url}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span>
          Dr. {appt.doctor?.userName}{" "}
          <span className="text-base text-gray-600 font-normal">
            ({appt.doctor?.specialization})
          </span>
        </span>
      </h3>

      <p className="text-sm text-gray-600 mt-1">
        Patient: {appt.patient?.patientName}
      </p>
      <p className="text-sm text-gray-500">Number: {appt.patient?.phone}</p>

      <div className="flex items-center mt-2 text-sm text-gray-500 gap-4">
        <span className="flex items-center gap-1">
          <FaRegCalendarAlt className="text-base" /> {appt.appointmentDate}
        </span>
        <span className="flex items-center gap-1">
          <FaRegClock className="text-base" /> {appt.startTime}-
          {dayjs(appt.endTime).format("hh:mm A")}
        </span>
      </div>

      <div className="mt-3">
        {appt.status === "Cancelled" ? (
          <span className="text-red-500 font-semibold">Cancelled</span>
        ) : appt.status === "Completed" ? (
          <span className="text-green-500 font-semibold">Completed</span>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="px-3 py-1 bg-[#e5e7fb] rounded-lg disabled:opacity-50"
            >
              {isLoading ? "Cancelling..." : "Cancel"}
            </button>

            <EditAppointment appt={appt} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AppointmentCard;


