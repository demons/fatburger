import { addIngredient } from "@/services/dishTemplate";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddIngredient() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ dishTemplateId, productId, count }) => {
      return addIngredient(dishTemplateId, productId, count);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["dishTemplate"] });
    },
  });
}
