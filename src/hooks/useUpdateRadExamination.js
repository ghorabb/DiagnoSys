import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BASE_URL } from "./apiBase";

const API_URL = `${BASE_URL}/examination/radiology`;

export function useUpdateRadExamination() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, formData }) => {
      const token = localStorage.getItem("token");

      const { data } = await axios.put(`${API_URL}/${id}`, formData, {
        headers: {
          token: `Bearer__${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    },

    onSuccess: (data) => {
      toast.success(data?.message || "Examination updated successfully!");
      queryClient.invalidateQueries(["examinations"]);
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to update examination.";
      toast.error(message);
      console.error("Error updating examination:", error);
    },
  });

  return mutation;
}
