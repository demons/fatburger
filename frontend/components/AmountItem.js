import { Flex, Text } from "@chakra-ui/react";

function AmountItem({ amount }) {
  const { energy, protein, fat, carb } = amount;

  return (
    <Flex width="250px" justifyContent="space-between">
      <Text fontSize="sm" color="gray.500">
        К: <i>{energy}</i>
      </Text>
      <Text fontSize="sm" color="gray.500">
        Б: <i>{protein}</i>
      </Text>
      <Text fontSize="sm" color="gray.500">
        Ж: <i>{fat}</i>
      </Text>
      <Text fontSize="sm" color="gray.500">
        У: <i>{carb}</i>
      </Text>
    </Flex>
  );
}

export default AmountItem;
