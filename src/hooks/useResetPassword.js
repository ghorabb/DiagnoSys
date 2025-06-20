import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./apiBase";

export function useResetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (resetData) => {
      const { data } = await axios.patch(
        `${BASE_URL}/auth/resetPassword`,
        resetData
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Password reset successfully!");
      navigate("/login");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Password reset failed.";
      toast.error(message);
    },
  });
}
