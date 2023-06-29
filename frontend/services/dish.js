import { fetchBase } from ".";

export async function addDish(groupId, dishTemplateId) {
  return fetchBase(`/groups/${groupId}/dishes`, {
    method: "POST",
    body: JSON.stringify({ dishTemplateId }),
  });
}

export async function fetchDish(groupId, dishId) {
  return fetchBase(`/groups/${groupId}/dishes/${dishId}`);
}
