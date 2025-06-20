import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BASE_URL } from "./apiBase";

const API_URL = `${BASE_URL}/appointment`;

export function useDeleteAppointment() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (appointmentId) => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      const url = `${API_URL}/${appointmentId}`;

      const response = await axios.patch(url, null, {
        headers: {
          token: `Bearer__${token}`,
        },
      });

      return response.data;
    },

    onSuccess: (data) => {
      toast.success(data?.message || "Appointment cancelled successfully!");
      queryClient.invalidateQueries(["appointments"]);
    },

    onError: (error) => {
      console.error("Cancel error:", error);
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to cancel appointment.";
      toast.error(message);
    },
  });

  return mutation;
}
