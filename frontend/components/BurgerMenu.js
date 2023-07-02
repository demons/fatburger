import NextLink from "next/link";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function BurgerMenu() {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <MenuItem as={NextLink} href={`/`}>
          Главная
        </MenuItem>
        <MenuItem as={NextLink} href={`/products`}>
          Продукты
        </MenuItem>
        <MenuItem as={NextLink} href={`/dishTemplates`}>
          Блюда
        </MenuItem>
        <MenuItem as={NextLink} href={`/stories`}>
          Дневник
        </MenuItem>
        <MenuItem as={NextLink} href={`/logout`}>
          Выйти
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
