import { useForm, useFieldArray } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { MdAutoAwesome } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { toast } from "react-hot-toast";
import TextInput from "../../ui/TextInput";

function PatientDetails({
  selectedPatient,
  isLoading,
  isGenerating,
  isUpdating,
  generateReport,
  updateExamination,
  handleStatusUpdate,
  onClose,
}) {
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      findings: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "findings",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState("");
  const [pdfBlob, setPdfBlob] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  function camelCaseToSnakeCase(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();
  }

  function handleImageChange(e) {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      ["image/jpeg", "image/png"].includes(selectedFile.type)
    ) {
      setImageFile(selectedFile);
      setImageFileName(selectedFile.name);
    } else {
      toast.error("Only JPEG or PNG images are allowed.");
      setImageFile(null);
      setImageFileName("");
    }
  }

  function handleGenerateReport() {
    if (!selectedPatient || !imageFile) return;

    const formData = new FormData();
    formData.append("patient_name", selectedPatient.patientId?.patientName);
    formData.append("age", selectedPatient.patientId?.age);
    formData.append("gender", selectedPatient.patientId?.gender);
    formData.append("file", imageFile);

    const indications = selectedPatient.clinicalIndications
      ? Object.entries(selectedPatient.clinicalIndications)
          .filter(([_, value]) => value)
          .map(([key]) => camelCaseToSnakeCase(key))
          .join(",")
      : "";

    formData.append("clinical_indications", indications);

    generateReport(formData, {
      onSuccess: (blob) => {
        const url = URL.createObjectURL(
          new Blob([blob], { type: "application/pdf" })
        );
        setPdfUrl(url);
        setPdfBlob(blob);
      },
    });
  }

function onSubmit(data) {
  if (!selectedPatient) return;

  const formData = new FormData();
  formData.append("bodyPart", data.bodyPart);
  formData.append("responseNotes", data.responseNotes);
  formData.append("impression", data.impression);

  let findings = data.findings
    .map((f) => f.value)
    .filter((f) => f.trim() !== "");

  // If there's only one finding, duplicate it
  if (findings.length === 1) {
    findings.push(findings[0]);
  }

  // Append findings
  findings.forEach((f) => formData.append("findings", f));

  // Append optional PDF and image if available
  if (pdfBlob) {
    formData.append(
      "pdf",
      new File([pdfBlob], "report.pdf", { type: "application/pdf" })
    );
  }

  if (imageFile) {
    formData.append("image", imageFile);
  }

  // Send to backend
  handleStatusUpdate(formData, () => {
    reset({ findings: [{ value: "" }] });
    setImageFile(null);
    setImageFileName("");
    setPdfBlob(null);
    setPdfUrl(null);
    if (onClose) onClose();
  });
}


  if (isLoading)
    return <p className="text-center text-gray-500">Loading details...</p>;

  if (!selectedPatient)
    return (
      <p className="text-center text-lg bg-white p-6 rounded-lg shadow-md">
        Select a patient to view details
      </p>
    );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold mb-6">Patient Details</h2>

      <div className="mb-4">
        <p className="font-semibold text-lg">
          {selectedPatient.patientId?.patientName}
        </p>
        <p className="text-gray-500 text-sm">
          {selectedPatient.patientId?.age} Years
        </p>
      </div>

      <p className="text-gray-600 mb-1">
        <strong>Gender:</strong> {selectedPatient.patientId?.gender}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Phone:</strong> {selectedPatient.patientId?.phone}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Doctor:</strong> {selectedPatient.doctorId?.userName}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Test:</strong> {selectedPatient.radExaminationType}
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Image Upload */}
          <div className="p-6 bg-[#f2f3fd] rounded-lg text-center">
            <h3 className="font-semibold mb-2">Image</h3>
            <FaUpload className="text-3xl text-gray-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">JPEG or PNG only</p>
            <label className="cursor-pointer bg-white border px-4 py-2 rounded-lg shadow-sm text-gray-700">
              <input
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={handleImageChange}
              />
              Browse
            </label>
            {imageFileName && (
              <p className="mt-2 text-green-600 text-sm">
                Selected: {imageFileName}
              </p>
            )}
          </div>

          <div className="p-6 bg-[#f2f3fd] rounded-lg text-center">
            <h3 className="font-semibold mb-2">Generate AI Report</h3>
            <MdAutoAwesome className="text-4xl text-gray-500 mx-auto mb-2" />
            <button
              type="button"
              onClick={handleGenerateReport}
              disabled={!imageFile || isGenerating}
              className="bg-white border px-4 py-2 rounded-lg shadow-sm text-gray-700"
            >
              {isGenerating ? "Generating..." : "Generate"}
            </button>
            {pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-3 text-blue-600 underline"
              >
                View PDF Report
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <TextInput
            label={
              <span>
                Body Part <span className="text-red-500">*</span>
              </span>
            }
            {...register("bodyPart", { required: true })}
          />
          <TextInput
            label={
              <span>
                Response Notes <span className="text-red-500">*</span>
              </span>
            }
            {...register("responseNotes", { required: true })}
          />
        </div>

        <div className="mb-4">
          <TextInput
            label={
              <span>
                Impression <span className="text-red-500">*</span>
              </span>
            }
            {...register("impression", { required: true })}
          />
        </div>

        {/* Dynamic Findings */}
        <div className="mb-6">
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-start">
                <TextInput
                  label={
                    <span>
                      Findings <span className="text-red-500">*</span>
                    </span>
                  }
                  {...register(`findings.${index}.value`, { required: true })}
                  className="w-full"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="mt-8 text-red-500 hover:text-red-700"
                    title="Remove"
                  >
                    <IoClose className="text-xl" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {fields.length < 5 && (
            <button
              type="button"
              onClick={() => append({ value: "" })}
              className="mt-2 text-blue-600 text-sm underline"
            >
              + Add more findings
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className={`mt-4 px-4 py-2 rounded-md bg-customBlue text-white flex items-center gap-2 ${
            isUpdating ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isUpdating ? "Updating..." : "Send"} <HiArrowRight />
        </button>
      </form>
    </div>
  );
}

export default PatientDetails;
