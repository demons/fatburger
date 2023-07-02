import { Flex, Text } from "@chakra-ui/react";

function AmountItem({ amount }) {
  const { energy, protein, fat, carb } = amount;

  return (
    <Flex justifyContent="space-between">
      <Text fontSize="sm" color="gray.500" px="2">
        <b>К</b>: <i>{energy}</i>
      </Text>
      <Text fontSize="sm" color="gray.500" px="2">
        <b>Б</b>: <i>{protein}</i>
      </Text>
      <Text fontSize="sm" color="gray.500" px="2">
        <b>Ж</b>: <i>{fat}</i>
      </Text>
      <Text fontSize="sm" color="gray.500" px="2">
        <b>У</b>: <i>{carb}</i>
      </Text>
    </Flex>
  );
}

export default AmountItem;
