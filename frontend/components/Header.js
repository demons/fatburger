"use client";

import NextLink from "next/link";
import {
  Box,
  Container,
  Flex,
  Image,
  Avatar,
  HStack,
  Link,
} from "@chakra-ui/react";

export default function Header() {
  return (
    <Box
      as="header"
      borderBottom="1px"
      borderColor="gray.200"
      bg="white"
      py="2"
    >
      <Container maxW="container.lg">
        <Flex justifyContent="space-between" alignItems="center">
          <Image src="/logo.png" alt="Logo" boxSize="48px" />
          <HStack>
            <Link href="/" as={NextLink}>
              Главная
            </Link>
            <Link href="/products" as={NextLink}>
              Продукты
            </Link>
            <Link href="/dishTemplates" as={NextLink}>
              Блюда
            </Link>
          </HStack>
          <HStack>
            <Avatar size="md" />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
