export default (set, get) => ({
  groupItems: [
    { id: "1", groupId: "1", ingredientId: "1" },
    { id: "2", groupId: "2", ingredientId: "2" },
    { id: "3", groupId: "2", dishId: "1" },
  ],

  getGroupItems: () => {
    const { getIngredientById, getDishById } = get();

    return get().groupItems.map((groupItem) => {
      let common = {
        groupId: groupItem.groupId,
      };

      if (groupItem.ingredientId) {
        const ingredient = getIngredientById(groupItem.ingredientId);
        return {
          ...common,
          ...ingredient,
        };
      } else {
        const dish = getDishById(groupItem.dishId);
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
  _removeGroupItemsChildrend: (groupItem) => {
    const { removeIngredientById, removeDish } = get();

    if (groupItem.ingredientId) {
      removeIngredientById(groupItem.ingredientId);
    } else if (groupItem.dishId) {
      removeDish(groupItem.dishId);
    }
  },
  removeGroupItem: (groupItemId) => {
    const { groupItems, _removeGroupItemsChildrend } = get();

    const filteredGroupItems = groupItems.filter((groupItem) => {
      if (groupItem.id !== groupItemId) {
        return true;
      }

      _removeGroupItemsChildrend(groupItem);

      return false;
    });

    set({ groupItems: filteredGroupItems });
  },
  removeGroupItemsByGroupId: (groupId) => {
    const { groupItems, _removeGroupItemsChildrend } = get();

    const filteredGroupItems = groupItems.filter((groupItem) => {
      if (groupItem.groupId !== groupId) {
        return true;
      }

      _removeGroupItemsChildrend(groupItem);

      return false;
    });

    set({ groupItems: filteredGroupItems });
  },
});
