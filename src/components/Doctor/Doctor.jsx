import { useCalendar } from "../../context/CalendarContext";
import { useState } from "react";
import CustomCalendar from "../../ui/CustomCalendar";
import Appointment from "./Appointment";
import PatientDetailsForm from "./PatientDetailsForm";
import TestResults from "./TestResults";
import { useGetAppToDoctor } from "../../hooks/useGetAppToDoctor"; // your custom hook
import { useGetAppointmentById } from "../../hooks/useGetAppointmentById";
import PatientDetails from "./PatientDetails";
import { useGetExaminationById } from "../../hooks/useGetExaminationById";
import { useGetExaminations } from "../../hooks/usegetExaminations";

function Doctor() {
  const { selectedDate } = useCalendar();
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [selectedExamId, setSelectedExamId] = useState(null);

  const { data: appointments = [], isLoading } = useGetAppToDoctor({
    date: selectedDate.format("MM/DD/YYYY"),
  });

  const { data: selectedAppointmentDetails, isLoading: isAppointmentLoading } =
    useGetAppointmentById(selectedAppointmentId);

  const { data: examinations = [], isLoading: isExaminationsLoading } =
    useGetExaminations();

  const { data: selectedExamination, isLoading: isExamLoading } =
    useGetExaminationById(selectedExamId);

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col gap-4">
      <CustomCalendar />

      <div className="p-4 bg-gray-100 min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top left */}
        <div className="bg-white p-4 rounded-lg shadow-md w-full place-self-start">
          <Appointment
            updatedPatients={appointments}
            setSelectedPatientId={setSelectedAppointmentId}
            isLoading={isLoading}
          />
        </div>

        {/* Top right */}
        <div className="bg-white p-4 rounded-lg shadow-md w-full place-self-start">
          <PatientDetailsForm
            selectedPatient={selectedAppointmentDetails}
            isLoading={isAppointmentLoading}
            handleStatusUpdate={() => {}}
            setSelectedAppointmentId={setSelectedAppointmentId}
          />
        </div>

        {/* Bottom left */}
        <div className="bg-white p-4 rounded-lg shadow-md w-full place-self-start">
          <TestResults
            updatedPatients={appointments}
            patients={examinations}
            isLoading={isExaminationsLoading}
            onSelectPatient={setSelectedExamId}
          />
        </div>

        {/* Bottom right */}
        <div className="bg-white p-4 rounded-lg shadow-md w-full place-self-start">
          <PatientDetails
            selectedPatient={selectedExamination}
            isLoading={isExamLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default Doctor;
