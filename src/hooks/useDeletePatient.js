import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BASE_URL } from "./apiBase";

const API_URL = `${BASE_URL}/patient`;

export function useDeletePatient() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (patientId) => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      const url = `${API_URL}/${patientId}`;

      const response = await axios.delete(url, {
        headers: {
          token: `Bearer__${token}`,
        },
      });

      return response.data;
    },
    onSuccess: () => {
      toast.success("Patient deleted successfully!");
      queryClient.invalidateQueries(["patients"]);
    },
    onError: (error) => {
      console.error("Delete error:", error);
      const message =
        error?.response?.data?.message || "Failed to delete patient.";
      toast.error(message);
    },
  });

  return mutation;
}
