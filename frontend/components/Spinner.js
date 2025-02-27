import { Spinner as Spn, Center } from "@chakra-ui/react";

export default function Spinner() {
  return (
    <Center>
      <Spn size="xl" emptyColor="gray.200" color="red.500" my="10" />
    </Center>
  );
}
