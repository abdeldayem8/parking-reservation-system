import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ticketApi } from "../../services/api";

export const useTicket = (id: string) => {
  return useQuery({
    queryKey: ["ticket", id],
    queryFn: () => ticketApi.getTicket(id),
    enabled: !!id,
  });
};

export const useCheckin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ticketApi.checkin,
    onSuccess: (data, variables) => {
      // Update zone data if zoneState is provided in response
      if (data?.zoneState) {
        queryClient.setQueryData(["zones", variables.gateId], (oldData: any) => {
          if (!oldData) return oldData;
          const zones = Array.isArray(oldData) ? oldData : oldData?.zones || [];
          return zones.map((zone: any) => 
            zone.id === data.zoneState.id ? data.zoneState : zone
          );
        });
      } else {
        // Fallback: invalidate zones if no zoneState in response
        queryClient.invalidateQueries({ queryKey: ["zones", variables.gateId] });
      }
      
      // Invalidate admin reports
      queryClient.invalidateQueries({ queryKey: ["admin", "parkingState"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "tickets"] });
    },
  });
};

export const useCheckout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ticketApi.checkout,
    onSuccess: (data, variables) => {
      // Invalidate ticket data
      queryClient.invalidateQueries({ queryKey: ["ticket", variables.ticketId] });
      // Invalidate admin reports and tickets
      queryClient.invalidateQueries({ queryKey: ["admin", "parkingState"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "tickets"] });
      
      // Update zone data if zoneState is provided in response
      if (data?.zoneState) {
        queryClient.setQueryData(["zones", data.zoneState.gateId], (oldData: any) => {
          if (!oldData) return oldData;
          const zones = Array.isArray(oldData) ? oldData : oldData?.zones || [];
          return zones.map((zone: any) => 
            zone.id === data.zoneState.id ? data.zoneState : zone
          );
        });
      }
    },
  });
};
