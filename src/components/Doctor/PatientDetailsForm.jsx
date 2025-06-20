import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import EditPatient from "./EditPatient";
import { useAddExamination } from "../../hooks/useAddExamination";
import { useEndAppointment } from "../../hooks/useEndAppointment";

function PatientDetailsForm({
  selectedPatient,
  isLoading,
  handleStatusUpdate,
  setSelectedAppointmentId,
}) {
  const { register, handleSubmit, reset, watch } = useForm();
  const requestTo = watch("requestTo");
  const { mutate: sendExamination, isPending } = useAddExamination();
  const { mutate: endAppointment, isPending: isFinishing } =
    useEndAppointment();

  const onSubmit = (data) => {
    const appointment = selectedPatient;
    const patientId = appointment?.patientId?._id;

    const examData = {
      patientId,
      requestTo: data.requestTo,
      doctorNotes: data.notes,
      labExaminationType:
        data.requestTo === "Lab" ? data.medicalAnalysis : undefined,
      radExaminationType:
        data.requestTo === "Radiology" ? data.scan : undefined,
      clinicalIndications: {
        cough: data.cough || false,
        fever: data.fever || false,
        trauma: data.trauma || false,
        followUp: data.followUp || false,
        chestPain: data.chestPain || false,
        otherIndication: data.otherIndication || false,
        routineScreening: data.routineScreening || false,
        ruleOutPneumonia: data.ruleOutPneumonia || false,
        shortnessOfBreath: data.shortnessOfBreath || false,
        abnormalLabResults: data.abnormalLabResults || false,
        ruleOutPneumothorax: data.ruleOutPneumothorax || false,
        unexplainedWeightLoss: data.unexplainedWeightLoss || false,
        preOperativeEvaluation: data.preOperativeEvaluation || false,
      },
    };

    sendExamination(examData);
    reset();
  };

  const handleFinish = () => {
    if (!selectedPatient?._id) return;

    endAppointment(selectedPatient._id, {
      onSuccess: () => {
        setSelectedAppointmentId(null);
      },
    });
  };

  if (isLoading)
    return <p className="text-center text-gray-500">Loading details...</p>;

  if (!selectedPatient)
    return (
      <p className="text-center text-gray-500">
        Select an appointment to view patient details
      </p>
    );

  const patient = selectedPatient?.patientId || {};

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Patient Details</h2>
        <EditPatient selectedPatient={selectedPatient} isLoading={isLoading} />
      </div>

      <div className="border-b pb-6 mb-11">
        <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-gray-600">
          <div>
            <p>
              <strong>Name:</strong> {patient?.patientName}
            </p>
            <p>
              <strong>Email:</strong> {patient?.email}
            </p>
            <p>
              <strong>Phone:</strong> {patient?.phone}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <p>
              <strong>BT:</strong> {patient?.bloodType}
            </p>
            <p>
              <strong>Gender:</strong> {patient?.gender}
            </p>
            <p>
              <strong>Age:</strong> {patient?.age}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-9">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-gray-600">
              Request To
            </label>
            <select
              {...register("requestTo")}
              className="w-full border p-2 rounded-md"
            >
              <option value="">Select</option>
              <option value="Lab">Lab</option>
              <option value="Radiology">Radiology</option>
            </select>
          </div>

          {requestTo === "Lab" && (
            <div>
              <label className="block font-medium text-gray-600">
                Lab Analysis
              </label>
              <select
                {...register("medicalAnalysis")}
                className="w-full border p-2 rounded-md"
              >
                <option value="">Select analysis</option>
                <option value="Blood">Blood</option>
                <option value="PCR">PCR</option>
                <option value="LFT">LFT</option>
              </select>
            </div>
          )}

          {requestTo === "Radiology" && (
            <div>
              <label className="block font-medium text-gray-600">
                Radiology Scan
              </label>
              <select
                {...register("scan")}
                className="w-full border p-2 rounded-md"
              >
                <option value="">Select scan</option>
                <option value="CT Scan">CT Scan</option>
                <option value="Ultrasound">Ultrasound</option>
                <option value="Mammogram">Mammogram</option>
                <option value="X-Ray">X-Ray</option>
                <option value="MRI">MRI</option>
              </select>
            </div>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-600">Notes</label>
          <textarea
            {...register("notes", { required: "Notes are required" })}
            className="w-full border p-3 rounded-md"
            rows="4"
          />
        </div>

        {requestTo === "Radiology" && (
          <fieldset className="grid grid-cols-3 gap-3">
            {[
              "cough",
              "fever",
              "trauma",
              "followUp",
              "chestPain",
              "otherIndication",
              "routineScreening",
              "ruleOutPneumonia",
              "shortnessOfBreath",
              "abnormalLabResults",
              "ruleOutPneumothorax",
              "unexplainedWeightLoss",
              "preOperativeEvaluation",
            ].map((indication) => (
              <label
                key={indication}
                className="flex items-center gap-2 text-sm text-gray-700 capitalize"
              >
                <input type="checkbox" {...register(indication)} />
                {indication.replace(/([A-Z])/g, " $1")}
              </label>
            ))}
          </fieldset>
        )}

        <div className="flex flex-col items-end">
          <button
            type="submit"
            className="bg-customBlue text-white px-4 py-2 rounded-md flex items-center gap-2"
            disabled={isPending}
          >
            {isPending ? "Sending..." : "Send"} <ArrowRight size={18} />
          </button>

          <button
            type="button"
            className="bg-customBlue text-white px-4 py-2 rounded-md flex items-center gap-2 mt-2"
            onClick={handleFinish}
            disabled={isFinishing}
          >
            {isFinishing ? "Finishing..." : "Finish"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PatientDetailsForm;
