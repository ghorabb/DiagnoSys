import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "./apiBase";

const API_URL = `${BASE_URL}/appointment/`;

export function useAddAppointment() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async function (appointmentData) {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      const response = await axios.post(API_URL, appointmentData, {
        headers: {
          token: `Bearer__${token}`,
        },
      });

      return response.data;
    },

    onSuccess: function (data) {
      toast.success(data?.message || "Appointment added successfully!");
      queryClient.invalidateQueries(["appointments"]);
    },

    onError: function (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to add appointment.";
      toast.error(message);
      console.error("Error:", error);
    },
  });

  return mutation;
}
