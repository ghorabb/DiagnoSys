import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BASE_URL } from "./apiBase";

const API_URL = `${BASE_URL}/appointment/end`;

export function useEndAppointment() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login again.");

      const response = await axios.patch(
        `${API_URL}/${id}`,
        {},
        {
          headers: {
            token: `Bearer__${token}`,
          },
        }
      );

      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Appointment marked as completed!");
      queryClient.invalidateQueries(["appointments"]);
    },
    onError: (error) => {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to end appointment.";
      toast.error(msg);
      console.error("End appointment error:", error);
    },
  });

  return mutation;
}
