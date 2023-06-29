import { fetchBase } from ".";

export async function updateGroup(groupId, title) {
  return fetchBase(`/groups/${groupId}`, {
    method: "PUT",
    body: JSON.stringify({ title }),
  });
}
