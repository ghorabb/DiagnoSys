import { useForm, useFieldArray } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { useAddPatient } from "../../hooks/useAddPatient";

function PatientForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

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

  const { mutate, isPending } = useAddPatient();

  function onSubmit(formData) {
    mutate(formData);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
      <h2 className="text-xl font-semibold pb-2 mb-6 border-b-2 border-[#EAECF0]">
        Add Patient
      </h2>

      <div className="space-y-8">
        <div className="space-y-6">
          <div>
            <span className="block mb-1 font-medium">Patient Name</span>
            <input
              {...register("patientName", {
                required: "Patient name is required",
                minLength: { value: 3, message: "Minimum length is 3" },
                maxLength: { value: 50, message: "Maximum length is 50" },
              })}
              type="text"
              placeholder="Enter patient name"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-customBlue"
            />
            {errors.patientName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.patientName.message}
              </p>
            )}
          </div>

          <div>
            <span className="block mb-1 font-medium">National ID</span>
            <input
              {...register("nationalId", {
                required: "National ID is required",
                pattern: {
                  value: /^.{14}$/,
                  message: "National ID must be exactly 14 characters",
                },
              })}
              type="text"
              placeholder="Enter national ID"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-customBlue"
            />
            {errors.nationalId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nationalId.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <span className="block mb-1 font-medium">Phone</span>
              <input
                {...register("phone", { required: "Phone is required" })}
                type="tel"
                placeholder="Enter phone"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-customBlue"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <span className="block mb-1 font-medium">Email</span>
              <input
                {...register("email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Enter email"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-customBlue"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[#f2f3fd] p-4 rounded-xl space-y-4">
          <h3 className="font-semibold text-base">Current Address</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              {...register("currentAddress.street")}
              placeholder="Street"
              className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-customBlue"
            />
            <input
              {...register("currentAddress.city")}
              placeholder="City"
              className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-customBlue"
            />
            <select
              {...register("currentAddress.governorate")}
              className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-customBlue"
            >
              <option value="">Select Governorate</option>
              {[
                "Cairo",
                "Alexandria",
                "Port Said",
                "Suez",
                "Damietta",
                "Dakahlia",
                "Sharqia",
                "Qalyubia",
                "Kafr El Sheikh",
                "Gharbia",
                "Monufia",
                "Beheira",
                "Ismailia",
                "Giza",
                "Beni Suef",
                "Fayoum",
                "Minya",
                "Assiut",
                "Sohag",
                "Qena",
                "Luxor",
                "Aswan",
                "Red Sea",
                "New Valley",
                "Matruh",
                "North Sinai",
                "South Sinai",
              ].map((gov) => (
                <option key={gov} value={gov}>
                  {gov}
                </option>
              ))}
            </select>
            <input
              {...register("currentAddress.zipCode", {
                pattern: {
                  value: /^\d{5}$/,
                  message: "Zip Code must be 5 digits",
                },
              })}
              placeholder="Zip Code"
              className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-customBlue"
            />
          </div>
        </div>

        <div className="bg-[#f2f3fd] p-4 rounded-xl space-y-4">
          <h3 className="font-semibold text-base">Emergency Contact</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              {...register("emergencyContact.name")}
              placeholder="Contact Name"
              className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-customBlue"
            />
            <input
              {...register("emergencyContact.phone")}
              placeholder="Contact Phone"
              className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-customBlue"
            />
            <input
              {...register("emergencyContact.relation")}
              placeholder="Relation"
              className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-customBlue"
            />
          </div>
        </div>

        <div>
          <span className="block mb-1 font-medium">Blood Type</span>
          <select
            {...register("bloodType")}
            className="w-full p-3 border border-gray-300 rounded-xl"
          >
            <option value="">Select blood type</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-base">Allergies</h3>
        {allergyFields.map((field, index) => (
          <input
            key={field.id}
            {...register(`allergies.${index}`)}
            placeholder={`Allergy ${index + 1}`}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-customBlue"
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
    
      <div className="space-y-2">
        <h3 className="font-semibold text-base">Medical History</h3>
        {historyFields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-2 gap-4">
            <input
              {...register(`medicalHistory.${index}.condition`)}
              placeholder="Condition"
              className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-customBlue"
            />
            <input
              {...register(`medicalHistory.${index}.diagnosisDate`)}
              type="date"
              className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-customBlue"
            />
            <input
              {...register(`medicalHistory.${index}.treatment`)}
              placeholder="Treatment"
              className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-customBlue"
            />
            <select
              {...register(`medicalHistory.${index}.status`, {
                required: "Status is required",
              })}
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

   
      <div className="space-y-2">
        <h3 className="font-semibold text-base">Current Medications</h3>
        {medFields.map((field, index) => (
          <input
            key={field.id}
            {...register(`currentMedications.${index}`)}
            placeholder={`Medication ${index + 1}`}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-customBlue"
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

      <div className="space-y-4 bg-[#f2f3fd] p-4 rounded-xl">
        <h3 className="font-semibold text-base">Insurance Details</h3>
        <input
          {...register("insuranceDetails.provider")}
          placeholder="Provider"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-customBlue"
        />
        <input
          {...register("insuranceDetails.policyNumber")}
          placeholder="Policy Number"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-customBlue"
        />
        <input
          {...register("insuranceDetails.validUntil")}
          type="date"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-customBlue"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="p-2 px-4 bg-customBlue text-white rounded-xl font-medium shadow-md flex items-center gap-2"
          disabled={isPending}
        >
          {isPending ? "Adding Patient..." : "Add Patient"}
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </form>
  );
}

export default PatientForm;
