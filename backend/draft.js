
const { sequelize } = require('./data');
// const { Group, Product, Ingredient } = require('./models');
const Group = require('./models/group');
const Product = require('./models/product');
const Ingredient = require('./models/ingredient');
const Subgroup = require('./models/subgroup');

app.use(cors());
app.use(bodyParser.json());

app.use((error, req, res, next) => {
  console.log('Error status: ', error.status);
  console.log('Message: ', error.message);
  res.status(error.status);
  res.json({ type: 'error', message: error.message });
});

app.get('/', function (req, res) {
  res.send('hello!');
});

app.get('/groups', async function (req, res) {
  const groups = await Group.findAll({
    include: [
      Ingredient,
      {
        model: Subgroup,
        include: Ingredient,
      },
    ],
  });

  return res.send({ type: 'success', response: groups });
});

app.post('/group', async function (req, res) {
  const { title } = req.body;

  const group = await Group.create({ title });

  const response = {
    ...group.toJSON(),
    ingredients: [],
    subgroups: [],
  };

  return res.send({ type: 'success', response });
});

app.put('/group', async function (req, res) {
  const { id, changes } = req.body;

  const result = await Group.update(
    { ...changes },
    {
      where: { id },
    }
  );

  let response = {};
  if (result > 0) {
    response = { ...response, id };
  }

  return res.send({ type: 'success', response });
});

app.delete('/group', async function (req, res) {
  const { id } = req.body;

  const result = await Group.destroy({
    where: { id },
  });

  let response = {};
  if (result > 0) {
    response = { ...response, id };
  }

  res.send({ type: 'success', response });
});

app.get('/products', async function (req, res) {
  const products = await Product.findAll();
  return res.send({ type: 'success', response: products });
});

app.post('/product', async function (req, res) {
  const { title, maker = '', energy, protein, fat, carb } = req.body;
  const product = await Product.create({ title, maker, energy, protein, fat, carb });
  return res.send({ type: 'success', response: product });
});

app.put('/product', async function (req, res) {
  const { id, changes } = req.body;

  const result = await Product.update(
    { ...changes },
    {
      where: { id },
    }
  );

  let response = {};
  if (result > 0) {
    response = { ...response, id, changes };
  }

  return res.send({ type: 'success', response });
});

app.delete('/product', async function (req, res) {
  const { id } = req.body;

  const result = await Product.destroy({
    where: { id },
  });

  let response = {};
  if (result > 0) {
    response = { ...response, id };
  }

  return res.send({ type: 'success', response });
});

app.post('/patterns', async function (req, res) {
  const { title, patternId } = req.body;
  res.send({ title, patternId });
});

// sequelize.sync({ force: true }).then(() => {
//   console.log('sync');
//   const group = Group.create({ title: 'Завтрк' });
//   Ingredient.create({ count: 50, groupId: group.id });
//   Group.create({ title: 'Обед' });
//   Group.create({ title: 'Ужин' });
//   app.listen(8080);
// });

(async () => {
  await sequelize.sync({ force: true });

  const product = await Product.create({
    title: 'Лук',
    maker: 'Магнит',
    energy: 50,
    protein: 5.5,
    fat: 2.1,
    carb: 7.0,
  });

  const group = await Group.create({ title: 'Завтрк' });
  const subgroup = await Subgroup.create({
    title: 'Картофель с курицей',
    groupId: group.id,
  });
  // group.addSubgroup(subgroup);
  const ingredient1 = await Ingredient.create({ count: 50, productId: product.id });
  group.addIngredient(ingredient1);

  const group1 = await Group.create({ title: 'Обед' });
  const group2 = await Group.create({ title: 'Ужин' });

  app.listen(8080);
})();
