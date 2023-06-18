import { nanoid } from "nanoid";

export default (set, get) => ({
  dishes: [
    { id: "1", title: "Копия печеный картофель" },
    { id: "2", title: "Копия кофе" },
  ],
  dishItems: [{ id: "1", dishId: "1", ingredientId: "3" }],

  getDishById: (dishId) => {
    const { dishes, dishItems, getIngredientById } = get();

    const dish = dishes.find((dish) => dish.id === dishId);

    if (!dish) {
      return null;
    }

    const filteredDishItems = dishItems
      .filter((dishItem) => dishItem.dishId === dishId)
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
  createDishFromDishTemplate: (dishTemplateId) => {
    const { getDishTemplateById, getDishTemplateItemsByDishTemplateId } = get();

    const dishTemplate = getDishTemplateById(dishTemplateId);
    const dishTemplateItems =
      getDishTemplateItemsByDishTemplateId(dishTemplateId);

    const dishId = nanoid();
    return {
      id: dishId,
      title: dishTemplate.title,
      items: dishTemplateItems.map(({ productId }) => ({
        id: nanoid(),
        dishId,
        productId,
      })),
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

    const filteredDishItems = dishItems.filter((dishItem) => {
      if (dishItem.dishId !== dishId) {
        return true;
      }

      removeIngredientById(dishItem.ingredientId);

      return false;
    });

    set({ dishItems: filteredDishItems });
  },
});
