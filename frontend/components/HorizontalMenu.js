import NextLink from "next/link";
import { HStack, Link } from "@chakra-ui/react";

export default function HorizontalMenu() {
  return (
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
      <Link href="/categories" as={NextLink}>
        Категории
      </Link>
    </HStack>
  );
}
