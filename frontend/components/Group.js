import { useRouter } from "next/navigation";
import { Flex, Card, CardHeader, Heading, CardBody } from "@chakra-ui/react";
import AmountItem from "./AmountItem";
import GroupItemList from "./GroupItemList";
import { useRemoveGroupMutation } from "@/hooks";

export default function Group({ group }) {
  const router = useRouter();
  const { mutate: removeGroup } = useRemoveGroupMutation();

  const { energy, protein, fat, carb, groupItems } = group;
  const amount = { energy, protein, fat, carb };

  const handleEdit = () => {
    router.push(`/groups/${group.id}`);
  };

  const handleRemove = () => {
    removeGroup(group.id);
  };

  return (
    <Card my="3" onClick={handleEdit}>
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="md">{group.title}</Heading>
          <AmountItem amount={amount} />
        </Flex>
      </CardHeader>
      <CardBody>
        <GroupItemList groupItems={groupItems} isCompact={true} />
      </CardBody>
    </Card>
  );
}
