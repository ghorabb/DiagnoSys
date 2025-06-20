import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BASE_URL } from "./apiBase";

const API_URL = `${BASE_URL}/appointment/doctor`; // update to match your API route

export function useGetAppToDoctor({ date = "" }) {
  return useQuery({
    queryKey: ["doctorAppointments", date],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      const params = new URLSearchParams();
      if (date) params.append("date", date);

      try {
        const { data } = await axios.get(`${API_URL}?${params.toString()}`, {
          headers: {
            token: `Bearer__${token}`,
          },
        });

        return data?.data || [];
      } catch (error) {
        if (error?.response?.status === 404) {
          return [];
        }

        throw error;
      }
    },
    onError: (error) => {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch doctor appointments.";
      toast.error(msg);
    },
  });
}
