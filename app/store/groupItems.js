export default (set, get) => ({
  groupItems: [
    { id: 1, groupId: 1, ingredientId: 1 },
    { id: 2, groupId: 2, ingredientId: 2 },
    { id: 3, groupId: 2, dishId: 1 },
  ],

  getGroupItems: () => {
    const { getIngredientById, getDishById } = get();

    return get().groupItems.map((item) => {
      let common = {
        groupId: item.groupId,
      };

      if (item.ingredientId) {
        const ingredient = getIngredientById(item.ingredientId);
        return {
          ...common,
          ...ingredient,
        };
      } else {
        const dish = getDishById(item.dishId);
        return {
          ...common,
          ...dish,
        };
      }
    });
  },
  getGroupItemsByGroupId: (groupId) => {
    const { getGroupItems } = get();

    const groupItems = getGroupItems();

    return groupItems.filter((groupItem) => groupItem.groupId === groupId);
  },
  removeItemsByGroupId: (itemId) => {
    const { groupItems, removeIngredientById, removeDish } = get();

    const filteredGroupItems = groupItems.filter(
      (groupItem) => groupItem.groupId !== itemId
    );

    groupItems
      .filter((groupItem) => groupItem.groupId === itemId)
      .forEach((groupItem) => {
        if (groupItem.ingredientId) {
          removeIngredientById(groupItem.ingredientId);
        } else if (groupItem.dishId) {
          removeDish(groupItem.dishId);
        }
      });

    set({ groupItems: filteredGroupItems });
  },
});
