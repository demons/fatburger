import { Flex, Box, Skeleton, Text } from "@chakra-ui/react";
import { useStore } from "@/store";

export default function Amount() {
  const amount = useStore((state) => state.amount);

  return (
    <Flex
      justifyContent="space-between"
      border="1px"
      borderColor="gray.200"
      p="2"
    >
      <Skeleton isLoaded={amount}>
        <Text fontSize="sm">Калории: {amount && amount.energy}</Text>
      </Skeleton>
      <Skeleton isLoaded={amount}>
        <Text fontSize="sm">Белки: {amount && amount.protein}</Text>
      </Skeleton>
      <Skeleton isLoaded={amount}>
        <Text fontSize="sm">Жиры: {amount && amount.fat}</Text>
      </Skeleton>
      <Skeleton isLoaded={amount}>
        <Text fontSize="sm">Углеводы: {amount && amount.carb}</Text>
      </Skeleton>
      <Skeleton isLoaded={amount}>
        <Text fontSize="sm">Клетчатка: {amount && amount.fib}</Text>
      </Skeleton>
    </Flex>
  );
}
