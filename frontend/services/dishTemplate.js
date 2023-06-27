import { fetchBase } from ".";

export async function addIngredient(dishTemplateId, productId, count = 0) {
  return fetchBase(`/dishTemplates/${dishTemplateId}/ingredients`, {
    method: "POST",
    body: JSON.stringify({ productId, count }),
  });
}
