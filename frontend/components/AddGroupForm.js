import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup } from "@/services";

function AddGroupForm() {
  const [title, setTitle] = useState("");
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      return;
    }

    mutate(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Добавить</button>
    </form>
  );
}

export default AddGroupForm;
