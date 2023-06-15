import { create } from "zustand";

import group from "./group";
import groupItems from "./groupItems";
import product from "./product";
import productTemplate from "./productTemplate";
import dish from "./dish";
import dishTemplate from "./dishTemplate";

export const useGroups = create((set, get) => ({
  ...group(set, get),
  ...groupItems(set, get),
  ...product(set, get),
  ...productTemplate(set, get),
  ...dish(set, get),
  ...dishTemplate(set, get),
}));
