import { addCategory, fetchCategories } from "@/services/category";
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
      return updateDishTemplate(categoryId, title);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["category"] });
    },
  });
}

export function useDeleteCategory() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId }) => {
      return deleteDishTemplate(categoryId);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
