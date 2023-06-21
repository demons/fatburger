export async function getGroups() {
  const res = await fetch(`/api/groups`);

  if (!res.ok) throw new Error("Произошла ошибка при получении...");

  return res.json();
}

export async function createGroup(title) {
  const res = await fetch(`/api/groups`, {
    method: "POST",
    body: JSON.stringify({ title }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}
