import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BASE_URL } from "./apiBase";

const API_URL = `${BASE_URL}/appointment/doctors`;

export function useGetDoctors(keyword = "") {
  return useQuery({
    queryKey: ["doctors", keyword],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      const params = new URLSearchParams();
      if (keyword) params.append("keyword", keyword);

      const { data } = await axios.get(`${API_URL}?${params}`, {
        headers: {
          token: `Bearer__${token}`,
        },
      });

      return data?.data || [];
    },
    onError: (error) => {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch doctors.";
      toast.error(msg);
    },
  });
}
