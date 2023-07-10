export async function fetchBase(path, options = {}) {
  const url = `/api${path}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status === 401 && location.pathname !== "/login") {
    location.href = "/login";
    localStorage.removeItem("user");
    return;
  }

  if (!res.ok) throw new Error("Произошла ошибка при получении...");

  return res.json();
}

export async function fetchGroups() {
  return fetchBase(`/groups`);
}

export async function fetchGroup(groupId) {
  return fetchBase(`/groups/${groupId}`);
}

export async function createGroup(title) {
  return fetchBase(`/groups`, {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}

export async function login(email, password) {
  const res = await fetch(`/api/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status === 400) return false;

  if (!res.ok) throw new Error("Произошла ошибка");

  return res.json();
}

export async function logout() {
  const res = await fetch(`/api/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}

export async function removeGroup(groupId) {
  return fetchBase(`/groups/${groupId}`, {
    method: "DELETE",
    body: JSON.stringify({ groupId }),
  });
}

export async function deleteDish(groupId, dishId) {
  return fetchBase(`/groups/${groupId}/dishes/${dishId}`, {
    method: "DELETE",
  });
}

export async function deleteIngredientFromGroup(groupId, ingredientId) {
  return fetchBase(`/groups/${groupId}/ingredients/${ingredientId}`, {
    method: "DELETE",
  });
}

export async function fetchProducts() {
  return fetchBase(`/products`);
}

export async function addIngredient(groupId, productId, count = 0) {
  return fetchBase(`/groups/${groupId}/ingredients`, {
    method: "POST",
    body: JSON.stringify({ productId, count }),
  });
}

export async function editIngredient(groupId, ingredientId, productId, count) {
  return fetchBase(`/groups/${groupId}/ingredients/${ingredientId}`, {
    method: "PUT",
    body: JSON.stringify({ productId, count }),
  });
}

export async function deleteProduct(productId) {
  return fetchBase(`/products/${productId}`, {
    method: "DELETE",
  });
}

export async function addProduct(
  title,
  maker,
  energy,
  protein,
  fat,
  carb,
  fib,
  weight
) {
  return fetchBase(`/products`, {
    method: "POST",
    body: JSON.stringify({
      title,
      maker,
      energy,
      protein,
      fat,
      carb,
      fib,
      weight,
    }),
  });
}

export async function fetchProduct(productId) {
  return fetchBase(`/products/${productId}`);
}

export async function editProduct(
  productId,
  title,
  maker,
  energy,
  protein,
  fat,
  carb,
  fib,
  weight
) {
  return fetchBase(`/products/${productId}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      maker,
      energy,
      protein,
      fat,
      carb,
      fib,
      weight,
    }),
  });
}

export async function fetchDishTemplates() {
  return fetchBase(`/dishTemplates`);
}

export async function fetchDishTemplate(dishTemplateId) {
  return fetchBase(`/dishTemplates/${dishTemplateId}`);
}

export async function deleteIngredientFromDishTemplate(
  dishTemplateId,
  ingredientId
) {
  return fetchBase(
    `/dishTemplates/${dishTemplateId}/ingredients/${ingredientId}`,
    {
      method: "DELETE",
    }
  );
}
