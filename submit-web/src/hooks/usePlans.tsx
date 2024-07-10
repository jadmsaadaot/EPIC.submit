import { useQuery } from "@tanstack/react-query";
import { request } from "@/utils/axiosUtils";

const fetchPlans = () => {
  return request({ url: "/plans" });
};

const fetchPlanById = (id: number) => {
  return request({ url: `/plans/${id}` });
};

export const usePlansData = () => {
  return useQuery({
    queryKey: ["plans"],
    queryFn: fetchPlans,
  });
};

export const usePlanById = (planId: number) => {
  return useQuery({
    queryKey: ["plan", planId],
    queryFn: () => fetchPlanById(planId),
    enabled: !!planId
  });
};
