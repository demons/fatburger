export async function fetchBase(url, options = {}) {
  const res = await fetch(url, options);

  if (res.status === 401) {
    localStorage.removeItem("user");
    location.href = "/login";
  }

  if (!res.ok) throw new Error("Произошла ошибка при получении...");

  return res.json();
}

export async function getGroups() {
  return fetchBase(`/api/groups`);
}

export async function createGroup(title) {
  return fetch(`/api/groups`, {
    method: "POST",
    body: JSON.stringify({ title }),
    headers: {
      "Content-Type": "application/json",
    },
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
