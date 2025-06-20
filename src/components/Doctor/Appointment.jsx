import { useState } from "react";
import Pagination from "../../ui/Pagination";
import { FiFilter } from "react-icons/fi";

const statuses = ["All", "Scheduled", "Re-Scheduled", "Completed", "Cancelled"];

function Appointment({
  setSelectedPatientId,
  updatedPatients = [],
  isLoading,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");

  const itemsPerPage = 7;

  const filteredPatients =
    selectedStatus === "All"
      ? updatedPatients
      : updatedPatients.filter((p) => p.status === selectedStatus);

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);

  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) return <p>Loading appointments...</p>;

  if (filteredPatients.length === 0)
    return <p className="text-gray-500">No appointments for this day.</p>;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Appointments</h2>
        <div className="relative">
          <button
            onClick={() => setFilterOpen((prev) => !prev)}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            <FiFilter className="w-4 h-4" />
          </button>
          {filterOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10">
              {statuses.map((status) => (
                <li
                  key={status}
                  onClick={() => {
                    setSelectedStatus(status);
                    setCurrentPage(1);
                    setFilterOpen(false);
                  }}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                    selectedStatus === status ? "bg-gray-100 font-semibold" : ""
                  }`}
                >
                  {status}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-lg border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="p-3 border">Patient Name</th>
              <th className="p-3 border">Sex</th>
              <th className="p-3 border">Age</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPatients.map((appointment) => (
              <tr
                key={appointment._id}
                className={`cursor-pointer hover:bg-gray-50 border-b ${
                  appointment.status !== "Scheduled" &&
                  appointment.status !== "Re-Scheduled"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => {
                  if (
                    appointment.status === "Scheduled" ||
                    appointment.status === "Re-Scheduled"
                  ) {
                    setSelectedPatientId(appointment._id);
                  }
                }}
              >
                <td className="p-3 border text-gray-900 font-medium">
                  {appointment.patient?.patientName}
                </td>
                <td className="p-3 border">{appointment.patient?.gender}</td>
                <td className="p-3 border">{appointment.patient?.age}</td>
                <td className="p-3 border">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full
                    ${
                      appointment.status === "Cancelled"
                        ? "bg-red-100 text-red-600"
                        : appointment.status === "Completed"
                          ? "bg-green-100 text-green-600"
                          : "bg-orange-100 text-orange-600"
                    }
                  `}
                  >
                    {appointment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Appointment;
