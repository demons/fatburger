export default (set, get) => ({
  items: [
    { id: 1, groupId: 1, productId: 1 },
    { id: 2, groupId: 2, productId: 2 },
  ],

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
