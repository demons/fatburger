import { create } from "zustand";

import group from "./group";
import groupItems from "./groupItems";
import ingredient from "./ingredient";
import product from "./product";
import dish from "./dish";
import dishTemplate from "./dishTemplate";

export const useGroups = create((set, get) => ({
  ...group(set, get),
  ...groupItems(set, get),
  ...ingredient(set, get),
  ...product(set, get),
  ...dish(set, get),
  ...dishTemplate(set, get),
}));

export const useStore = create((set, get) => ({
  editionIngredientId: null,

  setEditionIngredientId(ingredientId) {
    set({ editionIngredientId: ingredientId });
  },
}));
