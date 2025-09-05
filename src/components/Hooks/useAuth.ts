import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../../services/api";

export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // Store token in localStorage 
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
