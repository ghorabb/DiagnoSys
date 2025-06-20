import React, { useState, useEffect } from "react";

function PatientDetails({ selectedPatient, isLoading }) {
  const [showPdfModal, setShowPdfModal] = useState(false);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setShowPdfModal(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (isLoading)
    return <p className="text-center text-gray-500">Loading details...</p>;

  if (!selectedPatient)
    return (
      <p className="text-center text-gray-500">
        Select a patient to view details
      </p>
    );

  const {
    patientId,
    labExaminationType,
    radExaminationType,
    examinationResponse,
  } = selectedPatient;

  const testType = labExaminationType || radExaminationType;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Selected Patient Details</h2>

      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-600">
          <p className="font-bold">{patientId?.patientName}</p>
          <p className="text-sm text-gray-500">{patientId?.age} Years</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Gender: {patientId?.gender}</p>
          <p className="text-sm text-gray-600">Phone: {patientId?.phone}</p>
        </div>
      </div>

      <div className="text-gray-600">
        <p>
          <strong>Test:</strong> {testType}
        </p>
        <p>
          <strong>Doctor notes:</strong> {selectedPatient.doctorNotes || "N/A"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-11">
        <div
          className="flex-1 rounded-lg overflow-hidden bg-gray-100 cursor-pointer"
          onClick={() => setShowPdfModal(true)}
        >
          {examinationResponse?.pdfUrl?.url ? (
            <div>
              <iframe
                src={`${examinationResponse.pdfUrl.url}#zoom=page-fit`}
                title="Examination Report"
                className="w-full h-72"
              ></iframe>
              <p className="text-center text-sm text-gray-500 py-2">
                Click to view full screen
              </p>
            </div>
          ) : (
            <p className="text-center text-gray-500 p-4">
              No PDF report available
            </p>
          )}
        </div>

        <div className="flex-1 bg-[#f2f3fd] p-4 rounded-lg h-full">
          <h3 className="font-semibold">Report</h3>
          <p>
            <strong>Findings:</strong>
          </p>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {examinationResponse?.findings?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <p className="mt-4">
            <strong>Impression:</strong>{" "}
            {examinationResponse?.impression || "N/A"}
          </p>

          <p className="mt-2 text-sm text-gray-600">
            <strong>Response Notes:</strong>{" "}
            {examinationResponse?.responseNotes || "N/A"}
          </p>

          <p className="mt-2 text-xs text-gray-500">
            Report Date:{" "}
            {new Date(examinationResponse?.responseDateTime).toLocaleString()}
          </p>
        </div>
      </div>

      {showPdfModal && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
          onClick={() => setShowPdfModal(false)}
        >
          <div
            className="relative w-[90%] h-[90%] bg-white rounded-lg overflow-hidden shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`${examinationResponse?.pdfUrl?.url}#zoom=page-fit`}
              title="Full PDF"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientDetails;
