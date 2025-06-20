import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./apiBase";

export function useForgetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ email }) => {
      const { data } = await axios.patch(`${BASE_URL}/auth/forgetCode`, {
        email,
      });
      return data;
    },
    onSuccess: (_, variables) => {
      toast.success("Code sent to your email.");
      navigate("/reset-password", { state: { email: variables.email } });
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to send code.";
      toast.error(message);
    },
  });
}
