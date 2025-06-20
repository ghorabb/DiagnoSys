import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./apiBase";

export function useLogin(selectedRole) {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const { data } = await axios.post(`${BASE_URL}/auth/login`, credentials);
      return data;
    },
    onSuccess: (data) => {
      const token = data?.rseults?.token;

      if (!token) {
        toast.error("Login failed! No token received.");
        return;
      }

      const payload = JSON.parse(atob(token.split(".")[1]));
      const roleFromToken = payload?.role?.toLowerCase();

      if (roleFromToken !== selectedRole.toLowerCase()) {
        toast.error("Selected role does not match your account role!");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", roleFromToken);

      toast.success("Logged in successfully!");
      navigate(`/${roleFromToken}`);
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "Login failed!";
      toast.error(errorMessage);
    },
  });

  return loginMutation;
}
