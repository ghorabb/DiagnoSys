import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "./apiBase";

const API_URL = `${BASE_URL}/examination`;

export function useAddExamination() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (examinationData) => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      const response = await axios.post(API_URL, examinationData, {
        headers: {
          token: `Bearer__${token}`,
        },
      });

      return response.data;
    },

    onSuccess: (data) => {
      toast.success(data?.message || "Examination added successfully!");
      queryClient.invalidateQueries(["examinations"]);
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to add examination.";
      toast.error(message);
      console.error("Error adding examination:", error);
    },
  });

  return mutation;
}
