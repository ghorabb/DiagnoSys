import { useState } from "react";
import CustomCalendar from "../../ui/CustomCalendar";
import Patientlist from "./Patientlist";
import PatientDetails from "./PatientDetails";
import { useGetExaminations } from "../../hooks/useGetExaminations";
import { useGetExaminationById } from "../../hooks/useGetExaminationById";
import { useUpdateLabExamination } from "../../hooks/useUpdateLabExamination";

function Lab() {
  const [selectedExamId, setSelectedExamId] = useState(null);

  const { data: examinations = [], isLoading: isExaminationsLoading } =
    useGetExaminations();

  const labExaminations = examinations.filter(
    (exam) => exam.requestTo === "Lab"
  );

  const { data: selectedExamination, isLoading: isExamLoading } =
    useGetExaminationById(selectedExamId);

  const { mutate: updateExamination, isPending: isUpdating } =
    useUpdateLabExamination();

  function handleStatusUpdate(formData, onSuccess) {
    updateExamination(
      { id: selectedExamId, formData },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      }
    );
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <CustomCalendar />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="place-self-start w-full">
          <Patientlist
            patients={labExaminations}
            isLoading={isExaminationsLoading}
            onSelectPatient={setSelectedExamId}
          />
        </div>
        <div className="place-self-start w-full">
          <PatientDetails
            selectedPatient={selectedExamination}
            isLoading={isExamLoading}
            handleStatusUpdate={handleStatusUpdate}
            isUpdating={isUpdating}
            onClose={() => setSelectedExamId(null)}
          />
        </div>
      </div>
    </div>
  );
}

export default Lab;
