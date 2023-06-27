import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addIngredient,
  deleteDish,
  deleteIngredientFromGroup,
  fetchGroup,
  fetchGroups,
  fetchProducts,
  removeGroup,
} from "@/services";

export function useGroupsQuery() {
  return useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
    onError: (e) => {
      alert(e.message);
    },
  });
}

export function useGroupQuery(groupId) {
  return useQuery({
    queryKey: ["group"],
    queryFn: () => fetchGroup(groupId),
    onError: (e) => {
      alert(e.message);
    },
  });
}

export function useProductsQuery() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    onError: (e) => {
      alert(e.message);
    },
  });
}

export function useRemoveGroupMutation() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (groupId) => {
      return removeGroup(groupId);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["groups"] });
    },
  });
}

export function useDeleteDish() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ groupId, dishId }) => {
      return deleteDish(groupId, dishId);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["group"] });
    },
  });
}

export function useDeleteIngredientFromGroup() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ groupId, ingredientId }) => {
      return deleteIngredientFromGroup(groupId, ingredientId);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["group"] });
    },
  });
}

export function useAddIngredient() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ groupId, productId, count }) => {
      return addIngredient(groupId, productId, count);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["groupps"] });
    },
  });
}
