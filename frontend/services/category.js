import { fetchBase } from ".";

export async function fetchCategories() {
  return fetchBase(`/categories`);
}

export async function addCategory(title) {
  return fetchBase(`/categories`, {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}

export async function updateCategory(categoryId, title) {
  return fetchBase(`/categories/${categoryId}`, {
    method: "PUT",
    body: JSON.stringify({ title }),
  });
}

export async function deleteCategory(categoryId) {
  return fetchBase(`/categories/${categoryId}`, {
    method: "DELETE",
  });
}
