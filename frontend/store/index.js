import { create } from "zustand";

import group from "./group";
import groupItems from "./groupItems";
import ingredient from "./ingredient";
import product from "./product";
import dish from "./dish";
import dishTemplate from "./dishTemplate";
import { persist, createJSONStorage } from "zustand/middleware";

export const useGroups = create((set, get) => ({
  ...group(set, get),
  ...groupItems(set, get),
  ...ingredient(set, get),
  ...product(set, get),
  ...dish(set, get),
  ...dishTemplate(set, get),
}));

export const useStore = create(
  persist(
    (set, get) => ({
      editionIngredientId: null,
      amount: null,
      categoryFilter: null,

      setEditionIngredientId(ingredientId) {
        set({ editionIngredientId: ingredientId });
      },
      setAmount(amount) {
        set({ amount });
      },
      addCategoryFilter(id) {
        const categoryFilter = { ...get().categoryFilter };
        categoryFilter[id] = true;

        set({ categoryFilter });
      },
      deleteCategoryFilter(id) {
        const categoryFilter = { ...get().categoryFilter };
        delete categoryFilter[id];

        set({
          categoryFilter:
            Object.keys(categoryFilter).length > 0 ? categoryFilter : null,
        });
      },
      clearCategoryFilter() {
        set({ categoryFilter: null });
      },
      getCategoryFilter() {
        return get().categoryFilter;
      },
      setCategoryFilter(categoryFilter) {
        set({ categoryFilter });
      },
    }),
    { name: "common-store", storage: createJSONStorage(() => localStorage) }
  )
);
