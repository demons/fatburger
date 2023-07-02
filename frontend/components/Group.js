import { useRouter } from "next/navigation";
import {
  Flex,
  Card,
  CardHeader,
  Heading,
  CardBody,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useRemoveGroupMutation } from "@/hooks";
import AmountItem from "./AmountItem";
import GroupItemList from "./GroupItemList";

export default function Group({ group }) {
  const { mutate: removeGroup } = useRemoveGroupMutation();
  const router = useRouter();

  const { energy, protein, fat, carb, groupItems } = group;
  const amount = { energy, protein, fat, carb };

  const handleEdit = () => {
    router.push(`/groups/${group.id}`);
  };

  const handleRemove = () => {
    removeGroup(group.id);
  };

  return (
    <Card my="3">
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="md">{group.title}</Heading>
          <AmountItem amount={amount} />
          <HStack>
            <IconButton onClick={handleEdit} size="sm" icon={<EditIcon />} />
            <IconButton
              onClick={handleRemove}
              size="sm"
              colorScheme="red"
              icon={<DeleteIcon />}
            />
          </HStack>
        </Flex>
      </CardHeader>
      <CardBody>
        <GroupItemList groupItems={groupItems} isCompact={true} />
      </CardBody>
    </Card>
  );
}
