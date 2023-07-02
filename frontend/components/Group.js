import { useRouter } from "next/navigation";
import {
  Flex,
  Box,
  Card,
  Text,
  CardHeader,
  Heading,
  CardBody,
  IconButton,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
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
    <Box my="3">
      <Flex justifyContent="space-between" alignItems="center" my="1">
        <Heading as="h3" size="md">
          {group.title}
        </Heading>
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
      <GroupItemList groupItems={groupItems} isCompact={true} />
    </Box>
  );
}
