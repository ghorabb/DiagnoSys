import { Trash } from "lucide-react";
import { useDeletePatient } from "../../hooks/useDeletePatient";
import EditPatient from "./EditPatient";

function PatientRow({ patient }) {
  const firstName = patient.patientName.split(" ")[0];
  const deletePatient = useDeletePatient();

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${firstName}?`
    );
    if (confirmed) {
      deletePatient.mutate(patient._id);
    }
  };

  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="py-2 px-2 md:px-4 whitespace-nowrap">
        {patient.patientName}
      </td>
      <td className="py-2 px-2 md:px-4 whitespace-nowrap">
        {patient.nationalId}
      </td>
      <td className="py-2 px-2 md:px-4 whitespace-nowrap capitalize">
        {patient.gender}
      </td>
      <td className="py-2 px-2 md:px-4 flex justify-center gap-2">
        <EditPatient id={patient._id} />
        <button
          className="text-red-500 hover:text-red-700 p-2"
          onClick={handleDelete}
          disabled={deletePatient.isLoading}
        >
          <Trash size={18} />
        </button>
      </td>
    </tr>
  );
}

export default PatientRow;
