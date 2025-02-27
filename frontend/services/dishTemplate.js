import { fetchBase } from ".";

export async function addDishTemplate(title, weight) {
  return fetchBase(`/dishTemplates`, {
    method: "POST",
    body: JSON.stringify({ title, weight }),
  });
}

export async function updateDishTemplate(dishTemplateId, title, weight) {
  return fetchBase(`/dishTemplates/${dishTemplateId}`, {
    method: "PUT",
    body: JSON.stringify({ title, weight }),
  });
}

export async function deleteDishTemplate(dishTemplateId) {
  return fetchBase(`/dishTemplates/${dishTemplateId}`, {
    method: "DELETE",
  });
}

export async function addIngredient(dishTemplateId, productId, count = 0) {
  return fetchBase(`/dishTemplates/${dishTemplateId}/ingredients`, {
    method: "POST",
    body: JSON.stringify({ productId, count }),
  });
}

export async function editIngredient(
  dishTemplateId,
  ingredientId,
  productId,
  count
) {
  return fetchBase(
    `/dishTemplates/${dishTemplateId}/ingredients/${ingredientId}`,
    {
      method: "PUT",
      body: JSON.stringify({ productId, count }),
    }
  );
}
