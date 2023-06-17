export default (set, get) => ({
  ingredients: [
    { id: 1, productId: 1, count: 50 },
    { id: 2, productId: 2, count: 20 },
    { id: 3, productId: 2, count: 19 },
  ],

  getIngredientById: (ingredientId) => {
    const { ingredients, products } = get();

    const ingredient = ingredients.find(
      (ingredient) => ingredient.id === ingredientId
    );

    if (!ingredient) {
      return null;
    }

    const { id: _, ...product } = products.find(
      (product) => product.id === ingredient.productId
    );

    return {
      ...ingredient,
      ...product,
    };
  },
  getIngredients: () => {
    const { ingredients, getIngredientById } = get();

    return ingredients.map((ingredient) => getIngredientById(ingredient.id));
  },
  getIngredientsByGroupId: (groupId) => {
    const { getGroupItemsByGroupId } = get();

    const groupItems = getGroupItemsByGroupId(groupId);

    let ingredients = [];

    groupItems.forEach((groupItem) => {
      if (groupItem.items) {
        ingredients = [...ingredients, ...groupItem.items];
      } else {
        ingredients = [...ingredients, groupItem];
      }
    });

    return ingredients;
  },
  removeIngredientById: (ingredientId) => {
    const { ingredients } = get();

    const filteredIngredients = ingredients.filter(
      (ingredient) => ingredient.id !== ingredientId
    );

    set({ ingredients: filteredIngredients });
  },
});
