import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BASE_URL } from "./apiBase";

const API_URL = `${BASE_URL}/auth`;

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const token = localStorage.getItem("token");

      const { data } = await axios.put(API_URL, formData, {
        headers: {
          token: `Bearer__${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Profile updated successfully!");
      queryClient.invalidateQueries(["userProfile"]);
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to update profile.";
      toast.error(message);
    },
  });

  return mutation;
}
