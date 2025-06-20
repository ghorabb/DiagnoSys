import { useState } from "react";
import Pagination from "../../ui/Pagination";
import { useGetPatients } from "../../hooks/useGetPatients";
import PatientsListHeader from "./PatientsListHeader";
import PatientsTable from "./PatientsTable";

function PatientsList() {
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isPending, error } = useGetPatients({
    keyword: searchQuery,
  });
  const patients = data?.data || [];

  // const filteredPatients = patients;

  const totalPages = Math.ceil(patients.length / itemsPerPage);
  const paginatedPatients = patients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchQueryChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 md:p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 whitespace-nowrap">
          <h2 className="text-lg md:text-xl font-semibold">Patients List</h2>
          <span className="bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
            {isPending ? "Loading..." : `${patients.length} members`}
          </span>
        </div>
      </div>

      <PatientsListHeader
        searchQuery={searchQuery}
        setSearchQuery={handleSearchQueryChange}
      />
      {isPending ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error.message}</p>
      ) : patients.length === 0 ? (
        <p className="text-center text-gray-500">No patients found.</p>
      ) : (
        <>
          <PatientsTable patients={paginatedPatients} />
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default PatientsList;
