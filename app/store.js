import { create } from "zustand";
import { nanoid } from "nanoid";

export const useTodos = create((set) => ({
  todos: [
    { id: 1, title: "Learn JS", completed: true },
    { id: 2, title: "Learn React", completed: false },
  ],
  loading: false,
  error: null,
  addTodo: (title) =>
    set((state) => {
      const newTodo = { id: nanoid(), title, completed: false };

      return { todos: [...state.todos, newTodo] };
    }),
}));

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

const groups = [
  {
    id: 1,
    title: "Завтрак",
    items: [{ id: 1, title: "Лук", productId: 1, count: 5 }],
  },
];

const products = [
  {
    id: 1,
    title: "Лук",
    maker: "Магнит",
    energy: 10.0,
    protein: 5.2,
    fat: 2.3,
    carb: 3.5,
  },
];
