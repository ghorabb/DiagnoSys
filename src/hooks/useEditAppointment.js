import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BASE_URL } from "./apiBase";

const API_URL = `${BASE_URL}/appointment`;

export function useEditAppointment() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, updates }) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login again.");

      const response = await axios.put(`${API_URL}/${id}`, updates, {
        headers: { token: `Bearer__${token}` },
      });

      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Appointment updated!");
      queryClient.invalidateQueries(["appointments"]);
    },
    onError: (error) => {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to update appointment.";
      toast.error(msg);
      console.error("Edit error:", error);
    },
  });

  return mutation;
}
