import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BASE_URL } from "./apiBase";

const API_URL = `${BASE_URL}/patient`;

function cleanPatientData(data) {
  const allowedFields = [
    "phone",
    "email",
    "currentAddress",
    "emergencyContact",
    "allergies",
    "medicalHistory",
    "currentMedications",
    "insuranceDetails",
  ];

  const cleaned = {};

  for (const key of allowedFields) {
    const value = data[key];
    if (value === undefined) continue;

    if (Array.isArray(value)) {
      if (key === "medicalHistory") {
        cleaned[key] = value.map((item) => {
          const newItem = { ...item };
          delete newItem._id;
          delete newItem.id;
          return newItem;
        });
      } else {
        cleaned[key] = value;
      }
    } else if (typeof value === "object" && value !== null) {
      const newObj = { ...value };
      delete newObj._id;
      delete newObj.id;
      cleaned[key] = newObj;
    } else {
      cleaned[key] = value;
    }
  }

  return cleaned;
}

export function useUpdatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login again.");
      if (!id) throw new Error("Patient ID is missing.");

      const cleanedData = cleanPatientData(updatedData);

      const response = await axios.put(`${API_URL}/${id}`, cleanedData, {
        headers: {
          token: `Bearer__${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    },

    onSuccess: () => {
      toast.success("Patient updated successfully!");
      queryClient.invalidateQueries(["patients"]);
    },

    onError: (error) => {
      console.error("Update Patient Error:", error);
      const message =
        error?.response?.data?.message || "Failed to update patient.";
      toast.error(message);
    },
  });
}
