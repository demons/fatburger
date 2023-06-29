import { updateGroup } from "@/services/group";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateGroup() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ groupId, title }) => {
      return updateGroup(groupId, title);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["group"] });
    },
  });
}
