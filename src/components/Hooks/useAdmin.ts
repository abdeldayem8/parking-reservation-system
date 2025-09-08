import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "../../services/api";
import { API_URL } from "../../Config/Config";
import { endpoints } from "../../Config/endpoints";
import { useAuthStore } from "../../store/auth";

// Categories
export const useAdminCategories = () => {
  return useQuery({
    queryKey: ["admin", "categories"],
    queryFn: adminApi.getCategories,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminApi.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, category }: { id: string; category: any }) => 
      adminApi.updateCategory(id, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminApi.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

// Zones
export const useAdminZones = () => {
  return useQuery({
    queryKey: ["admin", "zones"],
    queryFn: adminApi.getZones,
  });
};

export const useCreateZone = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminApi.createZone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "zones"] });
      queryClient.invalidateQueries({ queryKey: ["zones"] });
    },
  });
};

export const useUpdateZone = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, zone }: { id: string; zone: any }) => 
      adminApi.updateZone(id, zone),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "zones"] });
      queryClient.invalidateQueries({ queryKey: ["zones"] });
    },
  });
};

export const useDeleteZone = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminApi.deleteZone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "zones"] });
      queryClient.invalidateQueries({ queryKey: ["zones"] });
    },
  });
};

export const useUpdateZoneOpen = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, open }: { id: string; open: boolean }) => 
      adminApi.updateZoneOpen(id, open),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "zones"] });
      queryClient.invalidateQueries({ queryKey: ["zones"] });
    },
  });
};

// Gates
export const useAdminGates = () => {
  return useQuery({
    queryKey: ["admin", "gates"],
    queryFn: adminApi.getGates,
  });
};

export const useCreateGate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminApi.createGate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "gates"] });
      queryClient.invalidateQueries({ queryKey: ["gates"] });
    },
  });
};

export const useUpdateGate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, gate }: { id: string; gate: any }) => 
      adminApi.updateGate(id, gate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "gates"] });
      queryClient.invalidateQueries({ queryKey: ["gates"] });
    },
  });
};

export const useDeleteGate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminApi.deleteGate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "gates"] });
      queryClient.invalidateQueries({ queryKey: ["gates"] });
    },
  });
};

// Rush Hours - server has no GET endpoint, only POST
export const useCreateRushHour = () => {
  return useMutation({
    mutationFn: adminApi.createAdminRushHour,
  });
};

export const useUpdateRushHour = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, rushHour }: { id: string; rushHour: any }) => 
      adminApi.updateRushHour(id, rushHour),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "rushHours"] });
    },
  });
};

export const useDeleteRushHour = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminApi.deleteRushHour,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "rushHours"] });
    },
  });
};

// Vacations - server has no GET endpoint, only POST
export const useCreateVacation = () => {
  return useMutation({
    mutationFn: adminApi.createAdminVacation,
  });
};

export const useUpdateVacation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, vacation }: { id: string; vacation: any }) => 
      adminApi.updateVacation(id, vacation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "vacations"] });
    },
  });
};

export const useDeleteVacation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminApi.deleteVacation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "vacations"] });
    },
  });
};

// Users
export const useUsers = () => {
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: adminApi.getUsers,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
};

// Subscriptions
export const useSubscriptions = () => {
  return useQuery({
    queryKey: ["admin", "subscriptions"],
    queryFn: adminApi.getSubscriptions,
  });
};

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminApi.createSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "subscriptions"] });
    },
  });
};

export const useUpdateSubscription = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, subscription }: { id: string; subscription: any }) => 
      adminApi.updateSubscription(id, subscription),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "subscriptions"] });
    },
  });
};

export const useDeleteSubscription = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminApi.deleteSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "subscriptions"] });
    },
  });
};

// Reports
export const useParkingStateReport = () => {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ["admin", "parkingState"],
    queryFn: async () => {
      const { data } = await API_URL.get(endpoints.admin.reports.parkingState, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return data;
    },
    enabled: !!token,
  });
};

// Tickets
export const useTickets = (status?: string) => {
  return useQuery({
    queryKey: ["admin", "tickets", status],
    queryFn: () => adminApi.getTickets(status),
  });
};
