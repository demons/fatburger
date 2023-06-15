import { create } from "zustand";

import group from "./group";
import item from "./item";
import product from "./product";
import productTemplate from "./productTemplate";

export const useGroups = create((set, get) => ({
  ...group(set, get),
  ...item(set, get),
  ...product(set, get),
  ...productTemplate(set, get),
}));
