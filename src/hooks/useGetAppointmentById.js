import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BASE_URL } from "./apiBase";

const API_URL = `${BASE_URL}/appointment`;

export function useGetAppointmentById(id) {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["getAppointmentById", id],
    queryFn: async () => {
      if (!token) {
        toast.error("No token found. Please login again.");
        throw new Error("No token found");
      }

      const { data } = await axios.get(`${API_URL}/${id}`, {
        headers: {
          token: `Bearer__${token}`,
        },
      });

      return data.data;
    },
    enabled: !!id,
    onError: (error) => {
      const msg =
        error?.response?.data?.message || "Failed to fetch appointment by ID.";
      toast.error(msg);
      console.error("Get Appointment By ID Error:", error);
    },
  });
}
