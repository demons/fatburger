import {
  addDish,
  addIngredient,
  deleteIngredient,
  editIngredient,
  fetchDish,
  updateDish,
} from "@/services/dish";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddDish() {
  return useMutation({
    mutationFn: ({ groupId, dishTemplateId, weight, count }) => {
      return addDish(groupId, dishTemplateId, weight, count);
    },
  });
}

export function useUpdateDish() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ groupId, dishId, title, weight, count }) => {
      return updateDish(groupId, dishId, title, weight, count);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["dish"] });
    },
  });
}

export function useDishQuery(groupId, dishId) {
  return useQuery({
    queryKey: ["dish"],
    queryFn: () => fetchDish(groupId, dishId),
  });
}

export function useAddIngredient() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ groupId, dishId, productId, count }) => {
      return addIngredient(groupId, dishId, productId, count);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["dish"] });
    },
  });
}

export function useEditIngredient() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ groupId, dishId, ingredientId, productId, count }) => {
      return editIngredient(groupId, dishId, ingredientId, productId, count);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["dish"] });
    },
  });
}

export function useDeleteIngredient() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ groupId, dishId, ingredientId }) => {
      return deleteIngredient(groupId, dishId, ingredientId);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["dish"] });
    },
  });
}
