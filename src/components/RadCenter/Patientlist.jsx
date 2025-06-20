import { useState } from "react";
import Pagination from "../../ui/Pagination";

function Patientlist({ isLoading, patients, onSelectPatient }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = patients
    .filter((exam) => exam.status === "Requested")
    .filter((exam) => {
      const name = exam?.patientId?.patientName?.toLowerCase() || "";
      const nationalId = exam?.patientId?.nationalId || "";
      const query = searchQuery.toLowerCase();

      return name.includes(query) || nationalId.includes(query);
    });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);

  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchQueryChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  if (isLoading) return <p>Loading patients list...</p>;

  return filteredPatients.length === 0 ? (
    <div className="flex flex-col items-center justify-center text-gray-500 font-medium h-64">
      No patients found.
    </div>
  ) : (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2 className="text-xl font-semibold whitespace-nowrap">
          Patients List
        </h2>
        <input
          type="text"
          placeholder="Enter patient name or nationalId"
          value={searchQuery}
          onChange={(e) => handleSearchQueryChange(e.target.value)}
          className="border rounded-md text-base w-full p-2 sm:w-auto flex-1 focus:outline-none focus:ring-2 focus:ring-customBlue"
        />
      </div>

      <div className="overflow-auto rounded-lg border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="p-3 border">Patients Name</th>
              <th className="p-3 border">Request To</th>
              <th className="p-3 border whitespace-nowrap">Exam.Type</th>
              <th className="p-3 border">Gender</th>
              <th className="p-3 border">Age</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>

          <tbody>
            {paginatedPatients.map((exam) => (
              <tr
                key={exam._id}
                className="cursor-pointer hover:bg-gray-50 border-b"
                onClick={() => {
                  onSelectPatient(exam._id);
                }}
              >
                <td className="p-3 border text-gray-900 font-medium">
                  {exam?.patientId?.patientName}
                </td>
                <td className="p-3 border text-gray-700">{exam?.requestTo}</td>
                <td className="p-3 border text-gray-700 w-24 whitespace-nowrap">
                  {exam?.radExaminationType}
                </td>
                <td className="p-3 border">{exam?.patientId?.gender}</td>
                <td className="p-3 border">{exam?.patientId?.age}</td>
                <td className="p-3 border">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      exam.status === "Cancelled"
                        ? "bg-red-100 text-red-600"
                        : exam.status === "Completed"
                          ? "bg-green-100 text-green-600"
                          : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {exam?.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Patientlist;
