export async function fetchBase(path, options = {}) {
  const url = `/api${path}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("user");
    location.href = "/login";
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
