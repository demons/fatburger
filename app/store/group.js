import { nanoid } from "nanoid";

export default (set, get) => ({
  groups: [
    { id: 1, title: "Завтрак" },
    { id: 2, title: "Обед" },
  ],

  addGroup: (title) => {
    const newGroup = { id: nanoid(), title };

    set({ groups: [...get().groups, newGroup] });
  },
  removeGroup: (groupId) => {
    get().removeItemsByGroupId(groupId);
    const filtered = get().groups.filter((group) => group.id !== groupId);

    set({ groups: filtered });
  },
});
