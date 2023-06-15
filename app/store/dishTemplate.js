export default (set, get) => ({
  dishTemplates: [
    { id: 1, title: "Печеный картофель" },
    { id: 2, title: "Кофе" },
  ],
  dishTemplateItems: [
    { id: 1, dishTemplateId: 1, productTemplateId: 1 },
    { id: 2, dishTemplateId: 2, productTemplateId: 2 },
  ],
});
