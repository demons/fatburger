import { addDish } from "@/services/dish";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddDish() {
  return useMutation({
    mutationFn: ({ groupId, dishTemplateId }) => {
      return addDish(groupId, dishTemplateId);
    },
  });
}
