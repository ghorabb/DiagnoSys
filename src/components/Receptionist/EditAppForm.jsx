import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useEditAppointment } from "../../hooks/useEditAppointment";
import { HiArrowRight } from "react-icons/hi";
import dayjs from "dayjs";

const formatTimeTo12Hour = (time24) => {
  return dayjs(`2020-01-01T${time24}`).format("hh:mm A");
};

const formatTimeTo24Hour = (time12) => {
  return dayjs(`2020-01-01 ${time12}`, "YYYY-MM-DD hh:mm A").format("HH:mm");
};

function EditAppForm({ appt }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate: editAppointment, isPending } = useEditAppointment();

  useEffect(() => {
    if (appt) {
      reset({
        appointmentDate: dayjs(appt?.appointmentDate).format("YYYY-MM-DD"),
        startTime: formatTimeTo24Hour(appt?.startTime),
        visitType: appt?.visitType === "Visit" ? "first-time" : "re-visit",
        notes: appt?.notes || "",
      });
    }
  }, []);

  const onSubmit = (data) => {
    const updates = {
      appointmentDate: dayjs(data.appointmentDate).format("MM/DD/YYYY"),
      startTime: formatTimeTo12Hour(data.startTime),
      visitType: data.visitType === "first-time" ? "Visit" : "Re-Visit",
      notes: data.notes,
    };

    editAppointment({ id: appt._id, updates });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <h2 className="text-lg font-semibold pb-1 mb-5 border-b-2 border-[#EAECF0]">
        Edit Appointment
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Patient Name</label>
          <input
            type="text"
            value={appt?.patient?.patientName || ""}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Doctor</label>
          <div className="flex gap-4 bg-[#f2f3fd] p-3 rounded-lg">
            <input
              type="text"
              value={appt?.doctor?.userName || ""}
              readOnly
              className="w-1/2 p-2 border border-gray-300 rounded-lg bg-gray-100"
            />
            <input
              type="text"
              value={appt?.doctor?.specialization || ""}
              readOnly
              className="w-1/2 p-2 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>
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
              {...register("startTime", { required: true })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>
          {(errors.appointmentDate || errors.startTime) && (
            <p className="text-red-500 text-sm">Please select date and time.</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Notes</label>
          <textarea
            {...register("notes")}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          ></textarea>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="w-fit p-3 bg-customBlue text-white rounded-lg font-medium shadow-md transition flex items-center gap-2"
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Update Appointment"}
            <HiArrowRight />
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditAppForm;
