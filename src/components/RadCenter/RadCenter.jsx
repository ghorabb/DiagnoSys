import CustomCalendar from "../../ui/CustomCalendar";
import Patientlist from "./Patientlist";
import PatientDetails from "./PatientDetails";
import { useGetExaminations } from "../../hooks/useGetExaminations";
import { useGetExaminationById } from "../../hooks/useGetExaminationById";
import { useState } from "react";
import { useGenerateReport } from "../../hooks/useGenerateReport";
import { useUpdateRadExamination } from "../../hooks/useUpdateRadExamination";

function RadCenter() {
  const [selectedExamId, setSelectedExamId] = useState(null);

  const { data: examinations = [], isLoading: isExaminationsLoading } =
    useGetExaminations();

  const radiologyExaminations = examinations.filter(
    (exam) => exam.requestTo === "Radiology"
  );

  const { data: selectedExamination, isLoading: isExamLoading } =
    useGetExaminationById(selectedExamId);

  const { mutate: generateReport, isPending: isGenerating } =
    useGenerateReport();

  const { mutate: updateExamination, isPending: isUpdating } =
    useUpdateRadExamination();

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
            patients={radiologyExaminations}
            isLoading={isExaminationsLoading}
            onSelectPatient={setSelectedExamId}
          />
        </div>
        <div className="place-self-start w-full">
          <PatientDetails
            selectedPatient={selectedExamination}
            isLoading={isExamLoading}
            generateReport={generateReport}
            isGenerating={isGenerating}
            handleStatusUpdate={handleStatusUpdate}
            isUpdating={isUpdating}
            onClose={() => setSelectedExamId(null)}
          />
        </div>
      </div>
    </div>
  );
}

export default RadCenter;
