import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addIngredient,
  addProduct,
  deleteDish,
  deleteIngredientFromDishTemplate,
  deleteIngredientFromGroup,
  deleteProduct,
  editIngredient,
  editProduct,
  fetchDishTemplate,
  fetchDishTemplates,
  fetchGroup,
  fetchGroups,
  fetchProduct,
  fetchProducts,
  removeGroup,
} from "@/services";

export function useGroupsQuery() {
  return useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
  });
}

export function useGroupQuery(groupId) {
  return useQuery({
    queryKey: ["group"],
    queryFn: () => fetchGroup(groupId),
  });
}

export function useProductsQuery() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
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
      client.invalidateQueries({ queryKey: ["group"] });
    },
  });
}

export function useEditIngredient() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ groupId, ingredientId, productId, count }) => {
      return editIngredient(groupId, ingredientId, productId, count);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["group"] });
    },
  });
}

export function useDeleteProduct() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ productId }) => {
      return deleteProduct(productId);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useAddProduct() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ title, maker, energy, protein, fat, carb, fib, weight }) => {
      return addProduct(title, maker, energy, protein, fat, carb, fib, weight);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useProductQuery(productId) {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => fetchProduct(productId),
  });
}

export function useEditProduct() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      title,
      maker,
      energy,
      protein,
      fat,
      carb,
      fib,
      weight,
    }) => {
      return editProduct(
        productId,
        title,
        maker,
        energy,
        protein,
        fat,
        carb,
        fib,
        weight
      );
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["product"] });
    },
  });
}

export function useDishTemplatesQuery() {
  return useQuery({
    queryKey: ["dishTemplates"],
    queryFn: fetchDishTemplates,
  });
}

export function useDishTemplateQuery(dishTemplateId) {
  return useQuery({
    queryKey: ["dishTemplate"],
    queryFn: () => fetchDishTemplate(dishTemplateId),
  });
}

export function useDeleteIngredientFromDishTemplate() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ dishTemplateId, ingredientId }) => {
      return deleteIngredientFromDishTemplate(dishTemplateId, ingredientId);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["dishTemplate"] });
    },
  });
}
