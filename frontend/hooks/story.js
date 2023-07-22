import {
  createStory,
  deleteStory,
  fetchStories,
  updateStory,
} from "@/services/story";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useStoriesQuery() {
  return useQuery({
    queryKey: ["stories"],
    queryFn: () => fetchStories(),
  });
}

export function useCreateStory() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({
      date,
      energy,
      protein,
      fat,
      carb,
      fib,
      type,
      comment,
      weight,
    }) => {
      return createStory(
        date,
        energy,
        protein,
        fat,
        carb,
        fib,
        type,
        comment,
        weight
      );
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["stories"] });
    },
  });
}

export function useUpdateStory() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({
      storyId,
      date,
      energy,
      protein,
      fat,
      carb,
      type,
      comment,
      weight,
    }) => {
      return updateStory(
        storyId,
        date,
        energy,
        protein,
        fat,
        carb,
        type,
        comment,
        weight
      );
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["stories"] });
    },
  });
}

export function useDeleteStory() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ storyId }) => {
      return deleteStory(storyId);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["stories"] });
    },
  });
}
