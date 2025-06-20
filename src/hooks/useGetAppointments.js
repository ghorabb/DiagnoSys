import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BASE_URL } from "./apiBase";

const API_URL = `${BASE_URL}/appointment`;

export function useGetAppointments({ keyword = "", date = "" }) {
  return useQuery({
    queryKey: ["appointments", keyword, date],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      const params = new URLSearchParams();
      if (keyword) params.append("keyword", keyword);
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
        "Failed to fetch appointments.";
      toast.error(msg);
    },
  });
}
