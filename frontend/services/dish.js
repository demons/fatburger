import { fetchBase } from ".";

export async function addDish(groupId, dishTemplateId) {
  return fetchBase(`/groups/${groupId}`, {
    method: "POST",
    body: JSON.stringify({ dishTemplateId }),
  });
}
