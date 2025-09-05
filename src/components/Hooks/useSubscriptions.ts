import { useQuery } from "@tanstack/react-query";
import { subscriptionApi } from "../../services/api";

export const useSubscription = (id: string) => {
  return useQuery({
    queryKey: ["subscription", id],
    queryFn: () => subscriptionApi.getSubscription(id),
    enabled: !!id,
  });
};
