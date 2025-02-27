export default (set, get) => ({
  products: [
    {
      id: "1",
      title: "Морковь",
      maker: "Магнит",
      energy: 200,
      protein: 5.0,
      fat: 2.5,
      carb: 3.4,
    },
    {
      id: "2",
      title: "Картофель",
      maker: "Пятерочка",
      energy: 300,
      protein: 2.0,
      fat: 3.1,
      carb: 1.5,
    },
  ],

  getProductById: (productId) => {
    const { products } = get();

    return products.find((product) => product.id === productId);
  },
});
