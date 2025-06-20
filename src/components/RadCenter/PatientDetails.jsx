import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { MdAutoAwesome } from "react-icons/md";
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
  const { register, handleSubmit, reset } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState("");
  const [pdfBlob, setPdfBlob] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [visibleFindings, setVisibleFindings] = useState(1);

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

    const findings = [data.finding1, data.finding2, data.finding3];
    findings.forEach((f) => formData.append("findings", f));

    if (pdfBlob) {
      formData.append(
        "pdf",
        new File([pdfBlob], "report.pdf", { type: "application/pdf" })
      );
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }

    handleStatusUpdate(formData, () => {
      reset();
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

          {/* AI Report Generation */}
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
          <TextInput
            label={
              <span>
                Finding 1 <span className="text-red-500">*</span>
              </span>
            }
            {...register("finding1", { required: true })}
          />

          {visibleFindings >= 2 && (
            <TextInput
              label={
                <span>
                  Finding 2 <span className="text-red-500">*</span>
                </span>
              }
              {...register("finding2", { required: true })}
            />
          )}

          {visibleFindings >= 3 && (
            <TextInput
              label={
                <span>
                  Finding 3 <span className="text-red-500">*</span>
                </span>
              }
              {...register("finding3", { required: true })}
            />
          )}
        </div>

        {visibleFindings < 3 && (
          <button
            type="button"
            className="text-blue-600 text-sm underline mb-4"
            onClick={() => setVisibleFindings((prev) => prev + 1)}
          >
            + Add more findings
          </button>
        )}

        <TextInput
          label={
            <span>
              Impression <span className="text-red-500">*</span>
            </span>
          }
          {...register("impression", { required: true })}
        />

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
