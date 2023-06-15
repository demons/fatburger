export default (set, get) => ({
  dishes: [
    { id: 1, title: "Копия печеный картофель" },
    { id: 2, title: "Копия кофе" },
  ],
  dishItems: [{ id: 1, dishId: 1, productId: 3 }],

  getDishById: (dishId) => {
    const { getProductById } = get();

    const dish = get().dishes.find((dish) => dish.id === dishId);

    if (!dish) {
      return null;
    }

    const filteredDishItems = get()
      .dishItems.filter((dishItem) => dishItem.dishId === dishId)
      .map((dishItem) => {
        const { id: _, ...product } = getProductById(dishItem.productId);

        return {
          ...dishItem,
          ...product,
        };
      });

    return {
      ...dish,
      items: filteredDishItems,
    };
  },
});
