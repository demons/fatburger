import { nanoid } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';

const myData = {
  groups: [
    {
      id: 'group1',
      title: 'Завтрак',
      subgroups: [
        {
          id: 'subgroup1',
          title: 'Курица с картошкой',
          ingredients: [{ id: 'ingredient2', productId: 'product2', count: 25 }],
        },
      ],
      ingredients: [{ id: 'ingredient1', productId: 'product1', count: 50 }],
    },
    { id: 'group2', title: 'Обед', subgroups: [], ingredients: [] },
  ],
  sets: [
    {
      id: 'set1',
      title: 'Курица с картошкой',
      productIds: ['product1'],
    },
  ],
  products: [
    {
      id: 'product1',
      title: 'Лук',
      maker: '',
      energy: 100,
      protein: 50,
      fat: 10,
      carb: 25,
    },
    {
      id: 'product2',
      title: 'Картофель',
      maker: '',
      energy: 110,
      protein: 60,
      fat: 20,
      carb: 35,
    },
    {
      id: 'product3',
      title: 'Майонез',
      maker: '',
      energy: 120,
      protein: 70,
      fat: 30,
      carb: 45,
    },
    {
      id: 'product4',
      title: 'Чеснок',
      maker: '',
      energy: 130,
      protein: 80,
      fat: 40,
      carb: 55,
    },
  ],
};

const ingredient = new schema.Entity('ingredients');
const product = new schema.Entity('products');
const set = new schema.Entity('sets', {
  productIds: [product],
});
const subgroup = new schema.Entity('subgroups', {
  ingredients: [ingredient],
});
const group = new schema.Entity('groups', {
  subgroups: [subgroup],
  ingredients: [ingredient],
});

const mySchema = {
  groups: [group],
  subgroups: [subgroup],
  ingredients: [ingredient],
  sets: [set],
  products: [product],
};
const normalizedData = normalize(myData, mySchema);

export default class FakeService {
  getPatterns() {
    console.log('getPatterns');
    return normalizedData;
  }

  getSets() {
    return normalizedData.entities.sets;
  }

  getGroups() {
    return normalizedData;
  }

  getProducts() {
    return normalizedData.entities.products;
  }

  addNewGroup(title) {
    return {
      id: nanoid(),
      title,
      subgroups: [],
      ingredients: [],
    };
  }

  addNewSet(title) {
    return {
      id: nanoid(),
      title,
      productIds: [],
    };
  }

  updateGroup(id, title) {
    return { type: 'success', message: '' };
  }

  updateSubgroup(id, title) {
    return { type: 'success' };
  }

  updateSet(id, title) {
    return { type: 'success' };
  }

  removeGroup(groupId) {
    return groupId;
  }

  removeSubgroup(subgroupId) {
    return subgroupId;
  }

  removeSet(setId) {
    return setId;
  }

  addIngredientToGroup(groupId, ingredient) {
    return {
      id: nanoid(),
      ...ingredient,
    };
  }

  addIngredientForSubgroup(subgroupId, ingredient) {
    return {
      id: nanoid(),
      ...ingredient,
    };
  }

  addIngredientForGroup(groupId, ingredient) {
    return {
      id: nanoid(),
      ...ingredient,
    };
  }

  addProductToSet(setId, productId) {
    return {
      setId,
      productId,
    };
  }

  removeIngredientByGroup(groupId, ingredientId) {
    return { groupId, ingredientId };
  }

  removeIngredientBySubgroup(subgroupId, ingredientId) {
    return { subgroupId, ingredientId };
  }

  removeProductFromSet(setId, productId) {
    return {
      setId,
      productId,
    };
  }

  copySet(groupId, setId) {
    return {
      groupId,
      subgroup: {
        id: nanoid(),
        title: 'copied set',
        ingredients: ['ingredient20', 'ingredient21'],
      },
      ingredients: {
        ingredient20: { id: 'ingredient20', productId: 'product1', count: 0 },
        ingredient21: { id: 'ingredient21', productId: 'product2', count: 0 },
      },
    };
  }
}
