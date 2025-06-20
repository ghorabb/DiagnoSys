import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import Pagination from "../../ui/Pagination";

function TestResults({ onSelectPatient, isLoading, patients }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilter, setShowFilter] = useState(false);

  const filteredPatients = [...patients]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .filter((exam) => {
      const name = exam?.patientId?.patientName?.toLowerCase() || "";
      const nationalId = exam?.patientId?.nationalId || "";
      const query = searchQuery.toLowerCase();
      const matchesSearch = name.includes(query) || nationalId.includes(query);
      const matchesStatus =
        statusFilter === "All" || exam.status === statusFilter;
      return matchesSearch && matchesStatus;
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

  const handleStatusSelect = (status) => {
    setStatusFilter(status);
    setShowFilter(false);
    setCurrentPage(1);
  };

  if (isLoading) return <p>Loading test results...</p>;

  return (
    <div className="flex flex-col text-sm relative">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2 className="text-lg font-semibold whitespace-nowrap">
          Test Results
        </h2>

        <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
          <input
            type="text"
            placeholder="Enter patient name or nationalId"
            value={searchQuery}
            onChange={(e) => handleSearchQueryChange(e.target.value)}
            className="border rounded text-sm p-2 w-full focus:outline-none focus:ring-2 focus:ring-customBlue"
          />

          <div className="relative">
            <button
              onClick={() => setShowFilter((prev) => !prev)}
              className="p-2 border rounded text-gray-600 hover:bg-gray-100"
              title="Filter by status"
            >
              <FiFilter className="w-4 h-4" />
            </button>

            {showFilter && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10">
                {["All", "Completed", "Cancelled", "Requested"].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusSelect(status)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                        statusFilter === status
                          ? "bg-gray-100 font-semibold"
                          : ""
                      }`}
                    >
                      {status}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-auto rounded border border-gray-200">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 border whitespace-nowrap">Name</th>
              <th className="p-3 border whitespace-nowrap">Request To</th>
              <th className="p-3 border whitespace-nowrap">Exam Type</th>
              <th className="p-3 border whitespace-nowrap">Status</th>
              <th className="p-3 border whitespace-nowrap">Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPatients.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No test results found.
                </td>
              </tr>
            ) : (
              paginatedPatients.map((exam) => (
                <tr
                  key={exam._id}
                  className="cursor-pointer hover:bg-gray-50 border-b"
                  onClick={() => onSelectPatient(exam._id)}
                >
                  <td className="p-3 border font-medium max-w-[150px] truncate">
                    {exam?.patientId?.patientName}
                  </td>
                  <td className="p-3 border text-gray-700 max-w-[100px] truncate">
                    {exam?.requestTo}
                  </td>
                  <td className="p-3 border text-gray-700 max-w-[120px] truncate whitespace-nowrap">
                    {exam?.radExaminationType || exam?.labExaminationType}
                  </td>
                  <td className="p-3 border">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
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
                  <td className="p-3 border text-gray-700 whitespace-nowrap max-w-[100px] truncate">
                    {new Date(exam?.updatedAt).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))
            )}
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

export default TestResults;
