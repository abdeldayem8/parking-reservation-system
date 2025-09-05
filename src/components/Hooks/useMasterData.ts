import { useQuery } from "@tanstack/react-query";
import { masterApi } from "../../services/api";

// Gates
export const useGates = () => {
  return useQuery({
    queryKey: ["gates"],
    queryFn: masterApi.getGates,
  });
};

export const useGateDetails = (gateId: string) => {
  return useQuery({
    queryKey: ["gate", gateId],
    queryFn: async () => {
      const gates = await masterApi.getGates();
      const gatesList = Array.isArray(gates) ? gates : gates?.gates || [];
      return gatesList.find((g: any) => g.id === gateId);
    },
    enabled: !!gateId,
  });
};

// Zones
export const useZones = (gateId: string) => {
  return useQuery({
    queryKey: ["zones", gateId],
    queryFn: () => masterApi.getZones(gateId),
    enabled: !!gateId,
  });
};

// Categories
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: masterApi.getCategories,
  });
};
