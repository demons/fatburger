export default (set, get) => ({
  ingredients: [
    { id: 1, productTemplateId: 1, count: 50 },
    { id: 2, productTemplateId: 2, count: 20 },
    { id: 3, productTemplateId: 2, count: 19 },
  ],

  getIngredientById: (ingredientId) => {
    const ingredient = get().ingredients.find(
      (ingredient) => ingredient.id === ingredientId
    );

    if (!ingredient) {
      return null;
    }

    const { id: _, ...productTemplate } = get().productTemplates.find(
      (productTemplate) => productTemplate.id === ingredient.productTemplateId
    );

    return {
      ...ingredient,
      ...productTemplate,
    };
  },
});
