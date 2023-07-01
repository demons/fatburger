import { Flex, Box, Container } from "@chakra-ui/react";

function AmountItem({ amount }) {
  const { energy, protein, fat, carb } = amount;

  return (
    <Container>
      <Flex justifyContent="space-between" p="1">
        <Box>Калории: {energy}</Box>
        <Box>Белки: {protein}</Box>
        <Box>Жиры: {fat}</Box>
        <Box>Углеводы: {carb}</Box>
      </Flex>
    </Container>
  );
}

export default AmountItem;
