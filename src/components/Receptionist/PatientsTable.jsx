import PatientRow from "./PatientRow";

function PatientsTable({ patients }) {
  return (
    <div className="overflow-auto rounded-lg border border-gray-200 mt-4">
      <table className="w-full border-collapse rounded-lg text-sm">
        <thead className="bg-gray-100">
          <tr className="text-left text-gray-600">
            <th className="py-2 px-2 md:px-4 font-medium">Name</th>
            <th className="py-2 px-2 md:px-4 font-medium">ID</th>
            <th className="py-2 px-2 md:px-4 font-medium">Gender</th>
            <th className="py-2 px-2 md:px-4 font-medium text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <PatientRow key={patient.id || patient._id} patient={patient} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientsTable;
