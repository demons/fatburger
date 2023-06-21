export async function fetchBase(url, options = {}) {
  const res = await fetch(url, options);

  if (res.status === 401) {
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
