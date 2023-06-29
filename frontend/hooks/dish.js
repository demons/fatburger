import { addDish, fetchDish } from "@/services/dish";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddDish() {
  return useMutation({
    mutationFn: ({ groupId, dishTemplateId }) => {
      return addDish(groupId, dishTemplateId);
    },
  });
}

export function useDishQuery(groupId, dishId) {
  return useQuery({
    queryKey: ["dish"],
    queryFn: () => fetchDish(groupId, dishId),
    onError: (e) => {
      alert(e.message);
    },
  });
}
