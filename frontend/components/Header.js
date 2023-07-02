"use client";

import { Box, Container, Flex, Image, useMediaQuery } from "@chakra-ui/react";
import BurgerMenu from "./BurgerMenu";
import HorizontalMenu from "./HorizontalMenu";
import Button from "./Button";

export default function Header() {
  const [isLargerThan800] = useMediaQuery("(min-width: 700px)");

  let content;

  if (isLargerThan800) {
    content = (
      <Flex justifyContent="space-between" alignItems="center">
        <Image src="/logo.png" alt="Logo" boxSize="48px" />
        <HorizontalMenu />
        <Button href={`/logout`} colorScheme="pink">
          Выйти
        </Button>
      </Flex>
    );
  } else {
    content = (
      <Flex justifyContent="space-between" alignItems="center">
        <Image src="/logo.png" alt="Logo" boxSize="48px" />
        <BurgerMenu />
      </Flex>
    );
  }

  return (
    <Box
      as="header"
      borderBottom="1px"
      borderColor="gray.200"
      bg="white"
      py="2"
    >
      <Container maxW="container.lg">{content}</Container>
    </Box>
  );
}
