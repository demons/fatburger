import AddStoryForm from "@/components/AddStoryForm";

export default function Page({ params }) {
  const { storyId } = params;
  return <AddStoryForm editData={{ test: 1234 }} />;
}
