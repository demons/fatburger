export default (set, get) => ({
  items: [
    { id: 1, groupId: 1, productId: 1 },
    { id: 2, groupId: 2, productId: 2 },
  ],

  getGroupItems: () => {
    const { getProductById } = get();

    return get().items.map((item) => {
      const product = getProductById(item.productId);
      return {
        groupId: item.groupId,
        ...product,
      };
    });
  },
  removeItemsByGroupId: (itemId) => {
    const removeProductById = (productId) => {
      const filteredProducts = get().products.filter(
        (product) => product.id !== productId
      );

      set({ products: filteredProducts });
    };

    const filteredItems = get().items.filter((item) => {
      if (item.groupId === itemId) {
        removeProductById(item.productId);
        return false;
      }
      return true;
    });

    set({ items: filteredItems });
  },
});
