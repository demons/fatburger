import { fetchBase } from ".";

export async function addDish(groupId, dishTemplateId, weight, count) {
  return fetchBase(`/groups/${groupId}/dishes`, {
    method: "POST",
    body: JSON.stringify({ dishTemplateId, weight, count }),
  });
}

export async function updateDish(groupId, dishId, title, weight, count) {
  return fetchBase(`/groups/${groupId}/dishes/${dishId}`, {
    method: "PUT",
    body: JSON.stringify({ title, weight, count }),
  });
}

export async function fetchDish(groupId, dishId) {
  return fetchBase(`/groups/${groupId}/dishes/${dishId}`);
}

export async function addIngredient(groupId, dishId, productId, count = 0) {
  return fetchBase(`/groups/${groupId}/dishes/${dishId}/ingredients`, {
    method: "POST",
    body: JSON.stringify({ productId, count }),
  });
}

export async function editIngredient(
  groupId,
  dishId,
  ingredientId,
  productId,
  count
) {
  return fetchBase(
    `/groups/${groupId}/dishes/${dishId}/ingredients/${ingredientId}`,
    {
      method: "PUT",
      body: JSON.stringify({ productId, count }),
    }
  );
}

export async function deleteIngredient(groupId, dishId, ingredientId) {
  return fetchBase(
    `/groups/${groupId}/dishes/${dishId}/ingredients/${ingredientId}`,
    {
      method: "DELETE",
    }
  );
}
