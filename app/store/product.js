export default (set, get) => ({
  products: [
    { id: 1, productTemplateId: 1, count: 50 },
    { id: 2, productTemplateId: 2, count: 20 },
    { id: 3, productTemplateId: 2, count: 19 },
  ],

  getProductById: (productId) => {
    const product = get().products.find((product) => product.id === productId);

    if (!product) {
      return null;
    }

    const { id: _, ...productTemplate } = get().productTemplates.find(
      (productTemplate) => productTemplate.id === product.productTemplateId
    );

    return {
      ...product,
      ...productTemplate,
    };
  },
});
