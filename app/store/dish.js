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
});
