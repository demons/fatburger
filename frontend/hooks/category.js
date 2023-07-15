import {
  addCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "@/services/category";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}

export function useAddCategory() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ title }) => {
      return addCategory(title);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useUpdateCategory() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, title }) => {
      return updateCategory(categoryId, title);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useDeleteCategory() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId }) => {
      return deleteCategory(categoryId);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
