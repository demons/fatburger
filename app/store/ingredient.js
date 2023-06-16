export default (set, get) => ({
  ingredients: [
    { id: 1, productId: 1, count: 50 },
    { id: 2, productId: 2, count: 20 },
    { id: 3, productId: 2, count: 19 },
  ],

  getIngredientById: (ingredientId) => {
    const ingredient = get().ingredients.find(
      (ingredient) => ingredient.id === ingredientId
    );

    if (!ingredient) {
      return null;
    }

    const { id: _, ...product } = get().products.find(
      (product) => product.id === ingredient.productId
    );

    return {
      ...ingredient,
      ...product,
    };
  },
});
