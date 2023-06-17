import { nanoid } from "nanoid";

export default (set, get) => ({
  groups: [
    { id: "1", title: "Завтрак" },
    { id: "2", title: "Обед" },
  ],

  addGroup: (title) => {
    const { groups } = get();

    const newGroup = { id: nanoid(), title };

    set({ groups: [...groups, newGroup] });
  },
  removeGroup: (groupId) => {
    const { groups, removeGroupItemsByGroupId } = get();

    removeGroupItemsByGroupId(groupId);
    const filtered = groups.filter((group) => group.id !== groupId);

    set({ groups: filtered });
  },
  getGroupById: (groupId) => {
    const { groups } = get();

    return groups.find((group) => group.id === groupId);
  },
});
