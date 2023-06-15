import { create } from "zustand";
import { nanoid } from "nanoid";

export const useGroups = create((set, get) => ({
  groups: [
    { id: 1, title: "Завтрак" },
    { id: 2, title: "Обед" },
  ],
  items: [
    { id: 1, groupId: 1, productId: 1 },
    { id: 2, groupId: 2, productId: 2 },
  ],
  products: {
    1: { id: 1, productTemplateId: 1, count: 50 },
    2: { id: 2, productTemplateId: 2, count: 20 },
  },
  productTemplates: {
    1: {
      id: 1,
      title: "Морковь",
      maker: "Магнит",
      energy: 200,
      protein: 5.0,
      fat: 2.5,
      carb: 3.4,
    },
    2: {
      id: 2,
      title: "Картофель",
      maker: "Пятерочка",
      energy: 300,
      protein: 2.0,
      fat: 3.1,
      carb: 1.5,
    },
  },

  addGroup: (title) => {
    const newGroup = { id: nanoid(), title };

    set({ groups: [...get().groups, newGroup] });
  },
  removeGroup: (id) => {
    const filtered = get().groups.filter((group) => group.id !== id);

    set({ groups: filtered });
  },
  getProductById: (id) => {
    const product = get().products[id];
    const productTemplate = get().productTemplates[product.productTemplateId];

    delete productTemplate.id;

    return {
      ...product,
      ...productTemplate,
    };
  },
}));
