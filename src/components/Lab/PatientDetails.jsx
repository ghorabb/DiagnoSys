import { useForm, useFieldArray } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { FiX } from "react-icons/fi";
import TextInput from "../../ui/TextInput";
import { useState } from "react";

function PatientDetails({
  selectedPatient,
  handleStatusUpdate,
  isLoading,
  isUpdating,
  onClose,
}) {
  const [fileName, setFileName] = useState("");
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      findings: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "findings",
  });

  function onSubmit(data) {
    if (!selectedPatient) return;

    const formData = new FormData();
    if (data.bodyPart) formData.append("bodyPart", data.bodyPart);
    if (data.responseNotes)
      formData.append("responseNotes", data.responseNotes);
    if (data.impression) formData.append("impression", data.impression);
    // Get findings array
    let findings = data.findings
      .map((f) => f.value)
      .filter((f) => f.trim() !== "");

    // If there's only one finding, duplicate it
    if (findings.length === 1) {
      findings.push(findings[0]);
    }

    // Append findings
    findings.forEach((f) => formData.append("findings", f));

    if (data.file?.[0]) formData.append("pdf", data.file[0]);

    handleStatusUpdate(formData, () => {
      reset({ findings: [] });
      setFileName("");
      if (onClose) onClose();
    });
  }

  if (isLoading)
    return <p className="text-center text-gray-500">Loading details...</p>;

  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md flex flex-col ${
        selectedPatient ? "" : "h-fit"
      }`}
    >
      {selectedPatient ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Patient Details</h2>
          <div className="flex items-center space-x-5 mb-4">
            <div>
              <p className="font-semibold text-lg">
                {selectedPatient.patientId?.patientName}
              </p>
              <p className="text-gray-500 text-sm">
                {selectedPatient.patientId?.age} Years
              </p>
            </div>
          </div>

          <p className="text-gray-600 mb-1">
            <strong>Gender:</strong> {selectedPatient.patientId?.gender}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Phone:</strong> {selectedPatient.patientId?.phone}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Referred from:</strong>
          </p>
          <p className="text-gray-600">
            <strong>Doctor:</strong> {selectedPatient.doctorId?.userName}
          </p>
          <p className="text-gray-600">
            <strong>Test:</strong> {selectedPatient.labExaminationType}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Notes:</strong> {selectedPatient.doctorNotes}
          </p>

          <h3 className="font-semibold mb-2">Submit Lab Report</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Upload Box */}
            <div className="p-[54px] mb-4 border-none border-2 rounded-lg flex flex-col items-center bg-[#f2f3fd]">
              <FaUpload className="text-gray-500 text-3xl mb-2" />
              <p className="text-gray-500">
                Choose a file or drag & drop it here
              </p>
              <label className="cursor-pointer bg-white border px-4 py-2 mt-2 rounded-lg shadow-sm text-gray-700">
                <input
                  type="file"
                  className="hidden"
                  {...register("file", {
                    onChange: (e) => {
                      const name = e.target.files[0]?.name || "";
                      setFileName(name);
                    },
                  })}
                />
                Browse
              </label>
              {fileName && (
                <p className="mt-2 text-green-600 font-medium">
                  File selected: {fileName}
                </p>
              )}
            </div>

            {/* Text Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label={
                  <span>
                    Body Part <span className="text-red-500">*</span>
                  </span>
                }
                {...register("bodyPart", { required: true })}
              />

              <TextInput
                label="Response Notes"
                {...register("responseNotes")}
              />
              <TextInput label="Impression" {...register("impression")} />
            </div>

            {/* Findings Section */}
            <div className="mt-4">
              {fields.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <div className="flex-1">
                        <TextInput
                          label={<span>Findings</span>}
                          {...register(`findings.${index}.value`)}
                          className="w-full"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-gray-500 hover:text-red-600 mt-6"
                        title="Remove"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={() => append({ value: "" })}
                className="text-sm text-blue-600 underline mt-2"
              >
                + Add more findings
              </button>
            </div>

            {/* Submit */}
            <div className="flex items-center mt-5 gap-2">
              <button
                type="submit"
                disabled={isUpdating}
                className={`px-4 py-2 rounded-md flex items-center gap-2 text-white bg-customBlue ${
                  isUpdating ? "bg-gray-400 cursor-not-allowed" : ""
                }`}
              >
                {isUpdating ? "Updating..." : "Send"}
                <HiArrowRight />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <p className="text-center">Select a patient to view details</p>
      )}
    </div>
  );
}

export default PatientDetails;
