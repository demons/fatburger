export default (set, get) => ({
  dishTemplates: [
    { id: "1", title: "Печеный картофель" },
    { id: "2", title: "Кофе" },
  ],
  dishTemplateItems: [
    { id: "1", dishTemplateId: "1", productId: "1" },
    { id: "2", dishTemplateId: "2", productId: "2" },
  ],

  getDishTemplateById: (dishTemplateId) => {
    const { dishTemplates } = get();

    return dishTemplates.find(
      (dishTemplate) => dishTemplate.id === dishTemplateId
    );
  },
  getDishTemplateItemsByDishTemplateId: (dishTemplateId) => {
    const { dishTemplateItems } = get();

    return dishTemplateItems.filter(
      (dishTemplateItem) => dishTemplateItem.dishTemplateId === dishTemplateId
    );
  },
});
