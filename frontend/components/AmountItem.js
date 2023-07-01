import { Flex, Box, Text } from "@chakra-ui/react";

function AmountItem({ amount }) {
  const { energy, protein, fat, carb } = amount;

  return (
    <Flex width="300px" justifyContent="space-between">
      <Box>
        <Text>Калории</Text>
        <Text textAlign="center">{energy}</Text>
      </Box>
      <Box>
        <Text>Белки</Text>
        <Text textAlign="center">{protein}</Text>
      </Box>
      <Box>
        <Text>Жиры</Text>
        <Text textAlign="center">{fat}</Text>
      </Box>
      <Box>
        <Text>Углеводы</Text>
        <Text textAlign="center">{carb}</Text>
      </Box>
    </Flex>
  );
}

export default AmountItem;
