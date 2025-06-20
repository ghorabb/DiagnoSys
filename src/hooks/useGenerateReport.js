import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:8000/generate-report";

export function useGenerateReport() {
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post(API_URL, formData);
      return response.data;
    },

    onSuccess: (data) => {
      toast.success("Report generated successfully!");
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to generate report.";
      toast.error(message);
      console.error("Error generating report:", error);
    },
  });

  return mutation;
}
