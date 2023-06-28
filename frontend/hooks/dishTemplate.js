import { addIngredient, editIngredient } from "@/services/dishTemplate";
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

export function useEditIngredient() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ dishTemplateId, ingredientId, productId, count }) => {
      return editIngredient(dishTemplateId, ingredientId, productId, count);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["dishTemplate"] });
    },
  });
}
