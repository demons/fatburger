const { Sequelize } = require('sequelize');

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: 'db',
  dialect: 'postgres',
});

// export function init() {
//   const product = await Product.create({
//     title: 'Лук',
//     maker: 'Магнит',
//     energy: 50,
//     protein: 5.5,
//     fat: 2.1,
//     carb: 7.0,
//   });

//   const group = await Group.create({ title: 'Завтрк' });
//   const subgroup = await Subgroup.create({
//     title: 'Картофель с курицей',
//     groupId: group.id,
//   });
//   // group.addSubgroup(subgroup);
//   const ingredient1 = await Ingredient.create({ count: 50, productId: product.id });
//   group.addIngredient(ingredient1);

//   const group1 = await Group.create({ title: 'Обед' });
//   const group2 = await Group.create({ title: 'Ужин' });
// }

module.exports = sequelize;
