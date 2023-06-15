export default (set, get) => ({
  dishes: [
    { id: 1, title: "Копия печеный картофель" },
    { id: 2, title: "Копия кофе" },
  ],
  dishItems: [{ id: 1, dishId: 1, productId: 3 }],

  getDishById: (dishId) => {
    const dish = get().dishes.find((dish) => dish.id === dishId);

    if (!dish) {
      return null;
    }

    return dish;
  },
});
