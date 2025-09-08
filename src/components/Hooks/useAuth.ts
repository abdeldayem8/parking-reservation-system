import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../store/auth";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const login = useAuthStore((state) => state.login);
  
  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) => 
      login(username, password),
    onSuccess: () => {
      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['admin'] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const logout = useAuthStore((state) => state.logout);
  
  return useMutation({
    mutationFn: async () => {
      logout();
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
