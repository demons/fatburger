export default function Page({ params }) {
  const { groupId, dishTemplateId } = params;

  return (
    <div>
      GroupId: {groupId}, dishTemplateId: {dishTemplateId}
    </div>
  );
}
