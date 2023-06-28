import { fetchBase } from ".";

export async function addDishTemplate(title) {
  return fetchBase(`/dishTemplates`, {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}

export async function updateDishTemplate(dishTemplateId, title) {
  return fetchBase(`/dishTemplates/${dishTemplateId}`, {
    method: "PUT",
    body: JSON.stringify({ title }),
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
