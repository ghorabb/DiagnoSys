import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BASE_URL } from "./apiBase";

const API_URL = `${BASE_URL}/auth/logout`;

export function useLogout() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(API_URL, {
        headers: {
          token: `Bearer__${token}`,
        },
      });

      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Logged out successfully");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login");
    },
    onError: (error) => {
      const msg =
        error?.response?.data?.message || "Failed to logout. Try again.";
      toast.error(msg);
    },
  });

  return mutation;
}
