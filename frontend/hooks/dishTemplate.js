import {
  addDishTemplate,
  addIngredient,
  editIngredient,
  updateDishTemplate,
} from "@/services/dishTemplate";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddDishTemplate() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ title }) => {
      return addDishTemplate(title);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["dishTemplates"] });
    },
  });
}

export function useUpdateDishTemplate() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ dishTemplateId, title }) => {
      return updateDishTemplate(dishTemplateId, title);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["dishTemplate"] });
    },
  });
}

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
