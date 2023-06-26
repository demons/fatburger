import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteDish,
  deleteIngredientFromGroup,
  fetchGroup,
  fetchGroups,
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
      client.invalidateQueries({ queryKey: ["groups"] });
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
      client.invalidateQueries({ queryKey: ["groups"] });
    },
  });
}
