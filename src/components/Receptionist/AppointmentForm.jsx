import { useForm } from "react-hook-form";
import { HiArrowRight } from "react-icons/hi";
import { useGetDoctors } from "../../hooks/useGetDoctors";
import { useAddAppointment } from "../../hooks/useAddAppointment";
import { useGetPatients } from "../../hooks/useGetPatients";
import { useState } from "react";
import dayjs from "dayjs";

function AppointmentForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const { data: doctors = [] } = useGetDoctors();
  const { data: patientResponse } = useGetPatients({ keyword: searchTerm });

  const patients = patientResponse?.data || [];

  const { mutate: addAppointment, isPending } = useAddAppointment();

  const selectedDoctorId = watch("doctor");
  const selectedDoctor = doctors.find((doc) => doc._id === selectedDoctorId);

  const formatTimeTo12Hour = (time24) => {
    return dayjs(`2020-01-01T${time24}`).format("hh:mm A");
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setSearchTerm(patient.patientName);
  };

  const onSubmit = (data) => {
    const payload = {
      patientId: selectedPatient._id,
      doctorId: data.doctor,
      appointmentDate: dayjs(data.appointmentDate).format("MM/DD/YYYY"),
      startTime: formatTimeTo12Hour(data.appointmentTime),
      status: "Scheduled",
      visitType: data.visitType === "first-time" ? "Visit" : "Re-Visit",
      notes: data.complaint,
    };

    addAppointment(payload, {
      onSuccess: () => {
        reset();
        setSearchTerm("");
        setSelectedPatient(null);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <h2 className="text-lg font-semibold pb-1 mb-5 border-b-2 border-[#EAECF0]">
        Add Appointment
      </h2>

      <div className="space-y-4">
        {/* PATIENT SEARCH */}
        <div className="relative">
          <label className="block mb-1 font-medium">Patient Name</label>
          <input
            type="text"
            placeholder="Search patient name"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedPatient(null);
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue"
          />
          {searchTerm.length > 0 && patients.length > 0 && !selectedPatient && (
            <ul className="absolute z-10 w-full max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-md mt-1">
              {patients.map((patient) => (
                <li
                  key={patient._id}
                  onClick={() => handlePatientSelect(patient)}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  {patient.patientName}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Visit Type</label>
          <div className="flex gap-4 bg-[#f2f3fd] p-3 rounded-lg w-fit">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="first-time"
                {...register("visitType", { required: true })}
                className="accent-customBlue"
              />
              First-Time Visit
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="re-visit"
                {...register("visitType", { required: true })}
                className="accent-customBlue"
              />
              Re-Visit
            </label>
          </div>
          {errors.visitType && (
            <p className="text-red-500 text-sm">Please select a visit type.</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Doctor</label>
          <div className="flex gap-4 bg-[#f2f3fd] p-3 rounded-lg">
            <select
              {...register("doctor", { required: true })}
              className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none"
            >
              <option value="">Select doctor</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.userName}
                </option>
              ))}
            </select>
            <input
              type="text"
              readOnly
              value={selectedDoctor?.specialization || ""}
              placeholder="Specialization"
              className="w-1/2 p-2 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>
          {errors.doctor && (
            <p className="text-red-500 text-sm">Please select a doctor.</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Appointment Date & Time
          </label>
          <div className="flex gap-4 items-center bg-[#f2f3fd] w-fit p-4 rounded-lg">
            <input
              type="date"
              {...register("appointmentDate", { required: true })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none"
            />
            <input
              type="time"
              {...register("appointmentTime", { required: true })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>
          {(errors.appointmentDate || errors.appointmentTime) && (
            <p className="text-red-500 text-sm">Please select date and time.</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Notes</label>
          <textarea
            {...register("complaint", { required: true })}
            placeholder="Enter complaint or symptoms..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          ></textarea>
          {errors.complaint && (
            <p className="text-red-500 text-sm">Notes are required.</p>
          )}
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="w-fit p-3 bg-customBlue text-white rounded-lg font-medium shadow-md transition flex items-center gap-2"
            disabled={isPending}
          >
            {isPending ? "Adding..." : "Add Appointment"}
            <HiArrowRight />
          </button>
        </div>
      </div>
    </form>
  );
}

export default AppointmentForm;
