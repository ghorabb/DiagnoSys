import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BASE_URL } from "./apiBase";

const API_URL = `${BASE_URL}/examination`;

export function useGetExaminationById(id) {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["getExaminationById", id],
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

      return data.data; // return actual examination object
    },
    enabled: !!id,
    onError: (error) => {
      const msg =
        error?.response?.data?.message || "Failed to fetch examination by ID.";
      toast.error(msg);
      console.error("Get Examination By ID Error:", error);
    },
  });
}
