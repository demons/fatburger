"use client";

import AddStoryForm from "@/components/AddStoryForm";
import ErrorAlert from "@/components/ErrorAlert";
import Spinner from "@/components/Spinner";
import { useStoryQuery } from "@/hooks/story";

export default function Page({ params }) {
  const { storyId } = params;
  const { data: story, status, error } = useStoryQuery(storyId);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <ErrorAlert message={error.message} />;
  }

  return <AddStoryForm editData={{ ...story }} />;
}
