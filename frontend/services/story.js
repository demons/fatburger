import { fetchBase } from ".";

export async function fetchStories() {
  return fetchBase(`/stories`);
}

export async function createStory(
  date,
  energy,
  protein,
  fat,
  carb,
  type,
  comment
) {
  return fetchBase(`/stories`, {
    method: "POST",
    body: JSON.stringify({ date, energy, protein, fat, carb, type, comment }),
  });
}

export async function updateStory(
  storyId,
  date,
  energy,
  protein,
  fat,
  carb,
  comment
) {
  return fetchBase(`/stories/${storyId}`, {
    method: "PUT",
    body: JSON.stringify({ date, energy, protein, fat, carb, type, comment }),
  });
}

export async function deleteStory(storyId) {
  return fetchBase(`/stories/${storyId}`, {
    method: "DELETE",
  });
}
