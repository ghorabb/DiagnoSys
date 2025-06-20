import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "./apiBase";

const API_URL = `${BASE_URL}/patient`;

export function useGetPatients({ keyword = "", gender = "" } = {}) {
  return useQuery({
    queryKey: ["patients", keyword, gender],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      const params = new URLSearchParams();
      if (keyword) params.append("keyword", keyword);
      if (gender) params.append("gender", gender);

      const { data } = await axios.get(`${API_URL}?${params.toString()}`, {
        headers: {
          token: `Bearer__${token}`,
        },
      });

      return data;
    },
  });
}
