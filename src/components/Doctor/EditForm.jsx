import { useForm, useFieldArray } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { useUpdatePatient } from "../../hooks/useUpdatePatient";
import { useEffect } from "react";
import toast from "react-hot-toast";
import dayjs from "dayjs";

const toISODate = (dateStr) => {
  return dateStr ? dayjs(dateStr).format("YYYY-MM-DD") : "";
};

function EditForm({ selectedPatient, isLoading }) {
  const { mutate: updatePatient, isPending } = useUpdatePatient();

  const patient = selectedPatient?.patientId;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (patient) {
      const formattedPatient = {
        ...patient,
        medicalHistory:
          patient.medicalHistory?.map((item) => ({
            ...item,
            diagnosisDate: toISODate(item.diagnosisDate),
          })) || [],
        insuranceDetails: {
          ...patient.insuranceDetails,
          validUntil: toISODate(patient.insuranceDetails?.validUntil),
        },
      };
      reset(formattedPatient);
    }
  }, [patient, reset]);

  const { fields: allergyFields, append: addAllergy } = useFieldArray({
    control,
    name: "allergies",
  });

  const { fields: historyFields, append: addHistory } = useFieldArray({
    control,
    name: "medicalHistory",
  });

  const { fields: medFields, append: addMed } = useFieldArray({
    control,
    name: "currentMedications",
  });

  const onSubmit = (data) => {
    if (!patient?._id) {
      toast.error("Cannot update: Patient ID is missing.");
      return;
    }
    updatePatient({ id: patient._id, updatedData: data });
  };

  if (isLoading) return <p className="p-4">Loading appointment data...</p>;
  if (!patient)
    return <p className="p-4 text-red-500">No patient data found.</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
      <h2 className="text-xl font-semibold pb-2 mb-6 border-b-2 border-[#EAECF0]">
        Edit Patient
      </h2>

      <div className="space-y-4">
        <input
          value={patient.patientName}
          disabled
          className="w-full p-3 bg-gray-100 border rounded-xl"
        />
        <input
          value={patient.nationalId}
          disabled
          className="w-full p-3 bg-gray-100 border rounded-xl"
        />
        <input
          value={patient.bloodType}
          disabled
          className="w-full p-3 bg-gray-100 border rounded-xl"
        />
      </div>

      <input
        {...register("phone", { required: "Phone is required" })}
        placeholder="Phone"
        className="p-3 border border-gray-300 rounded-xl w-full"
      />
      <input
        {...register("email")}
        placeholder="Email"
        className="p-3 border border-gray-300 rounded-xl w-full"
      />

      {/* Current Address */}
      <div className="bg-[#f2f3fd] p-4 rounded-xl space-y-4">
        <h3 className="font-semibold text-base">Current Address</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            {...register("currentAddress.street")}
            placeholder="Street"
            className="p-3 border rounded-xl"
          />
          <input
            {...register("currentAddress.city")}
            placeholder="City"
            className="p-3 border rounded-xl"
          />
          <input
            {...register("currentAddress.governorate")}
            placeholder="Governorate"
            className="p-3 border rounded-xl"
          />
          <input
            {...register("currentAddress.zipCode")}
            placeholder="Zip Code"
            className="p-3 border rounded-xl"
          />
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-[#f2f3fd] p-4 rounded-xl space-y-4">
        <h3 className="font-semibold text-base">Emergency Contact</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            {...register("emergencyContact.name")}
            placeholder="Name"
            className="p-3 border rounded-xl"
          />
          <input
            {...register("emergencyContact.phone")}
            placeholder="Phone"
            className="p-3 border rounded-xl"
          />
          <input
            {...register("emergencyContact.relation")}
            placeholder="Relation"
            className="p-3 border rounded-xl"
          />
        </div>
      </div>

      {/* Allergies */}
      <div className="space-y-2">
        <h3 className="font-semibold text-base">Allergies</h3>
        {allergyFields.map((field, index) => (
          <input
            key={field.id}
            {...register(`allergies.${index}`)}
            placeholder={`Allergy ${index + 1}`}
            className="w-full p-3 border rounded-xl"
          />
        ))}
        <button
          type="button"
          onClick={() => addAllergy("")}
          className="text-blue-500 text-sm underline"
        >
          + Add Allergy
        </button>
      </div>

      {/* Medical History */}
      <div className="space-y-2">
        <h3 className="font-semibold text-base">Medical History</h3>
        {historyFields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-2 gap-4">
            <input
              {...register(`medicalHistory.${index}.condition`)}
              placeholder="Condition"
              className="p-3 border rounded-xl"
            />
            <input
              {...register(`medicalHistory.${index}.diagnosisDate`)}
              type="date"
              className="p-3 border rounded-xl"
            />
            <input
              {...register(`medicalHistory.${index}.treatment`)}
              placeholder="Treatment"
              className="p-3 border rounded-xl"
            />
            <select
              {...register(`medicalHistory.${index}.status`)}
              className="p-3 border rounded-xl"
            >
              <option value="">Select Status</option>
              <option value="ongoing">Ongoing</option>
              <option value="recovered">Recovered</option>
            </select>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addHistory({})}
          className="text-blue-500 text-sm underline"
        >
          + Add History
        </button>
      </div>

      {/* Medications */}
      <div className="space-y-2">
        <h3 className="font-semibold text-base">Current Medications</h3>
        {medFields.map((field, index) => (
          <input
            key={field.id}
            {...register(`currentMedications.${index}`)}
            placeholder={`Medication ${index + 1}`}
            className="w-full p-3 border rounded-xl"
          />
        ))}
        <button
          type="button"
          onClick={() => addMed("")}
          className="text-blue-500 text-sm underline"
        >
          + Add Medication
        </button>
      </div>

      {/* Insurance */}
      <div className="space-y-4 bg-[#f2f3fd] p-4 rounded-xl">
        <h3 className="font-semibold text-base">Insurance Details</h3>
        <input
          {...register("insuranceDetails.provider")}
          placeholder="Provider"
          className="p-3 border rounded-xl w-full"
        />
        <input
          {...register("insuranceDetails.policyNumber")}
          placeholder="Policy Number"
          className="p-3 border rounded-xl w-full"
        />
        <input
          {...register("insuranceDetails.validUntil")}
          type="date"
          className="p-3 border rounded-xl w-full"
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="p-2 px-4 bg-customBlue text-white rounded-xl font-medium shadow-md flex items-center gap-2"
          disabled={isPending}
        >
          {isPending ? "Updating..." : "Update Patient"}
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </form>
  );
}

export default EditForm;
