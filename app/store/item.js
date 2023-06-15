export default (set, get) => ({
  items: [
    { id: 1, groupId: 1, productId: 1 },
    { id: 2, groupId: 2, productId: 2 },
    { id: 3, groupId: 2, dishId: 1 },
  ],

  getGroupItems: () => {
    const { getProductById, getDishById } = get();

    return get().items.map((item) => {
      let common = {
        groupId: item.groupId,
      };

      if (item.productId) {
        const product = getProductById(item.productId);
        return {
          ...common,
          ...product,
        };
      } else {
        const dish = getDishById(item.dishId);
        return {
          ...common,
          ...dish,
        };
      }
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
