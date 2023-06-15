import { create } from "zustand";
import { nanoid } from "nanoid";

export const useGroups = create((set, get) => ({
  groups: [
    { id: 1, title: "Завтрак" },
    { id: 2, title: "Обед" },
  ],
  addGroup: (title) => {
    const newGroup = { id: nanoid(), title };

    set({ groups: [...get().groups, newGroup] });
  },
  removeGroup: (id) => {
    const filtered = get().groups.filter((group) => group.id !== id);

    set({ groups: filtered });
  },
}));

export const useItems = create((set, get) => ({
  items: [
    { id: 1, groupId: 1, title: "Лук" },
    { id: 2, groupId: 2, title: "Морковь" },
  ],
}));
