export default (set, get) => ({
  dishes: [
    { id: 1, title: "Копия печеный картофель" },
    { id: 2, title: "Копия кофе" },
  ],
  dishItems: [{ id: 1, dishId: 1, ingredientId: 3 }],

  getDishById: (dishId) => {
    const { getIngredientById } = get();

    const dish = get().dishes.find((dish) => dish.id === dishId);

    if (!dish) {
      return null;
    }

    const filteredDishItems = get()
      .dishItems.filter((dishItem) => dishItem.dishId === dishId)
      .map((dishItem) => {
        const { id: _, ...ingredient } = getIngredientById(
          dishItem.ingredientId
        );

        return {
          ...dishItem,
          ...ingredient,
        };
      });

    return {
      ...dish,
      items: filteredDishItems,
    };
  },
  removeDish: (dishId) => {
    const { dishes, removeDishItemsByDishId } = get();

    const filteredDishes = dishes.filter((dish) => dish.id !== dishId);

    removeDishItemsByDishId(dishId);

    set({ dishes: filteredDishes });
  },
  removeDishItemsByDishId: (dishId) => {
    const { dishItems, removeIngredientById } = get();

    const filteredDishItems = dishItems.filter(
      (dishItem) => dishItem.dishId !== dishId
    );

    dishItems
      .filter((dishItem) => dishItem.dishId === dishId)
      .forEach((dishItem) => removeIngredientById(dishItem.ingredientId));

    set({ dishItems: filteredDishItems });
  },
});
