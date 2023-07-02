"use client";

import { useEffect, useState } from "react";
import { HStack, Stack, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useAddProduct, useEditProduct } from "@/hooks";
import Button from "./Button";

export default function AddProduct({ product }) {
  const [title, setTitle] = useState("");
  const [maker, setMaker] = useState("");
  const [energy, setEnergy] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [carb, setCarb] = useState("");
  const router = useRouter();
  const { mutate: addProduct } = useAddProduct();
  const { mutate: editProduct } = useEditProduct();

  useEffect(() => {
    if (product) {
      const { title, maker, energy, protein, fat, carb } = product;
      setTitle(title);
      setMaker(maker);
      setEnergy(energy);
      setProtein(protein);
      setFat(fat);
      setCarb(carb);
    }
  }, [product]);

  const handleChange = (e) => {
    let { value, type } = e.target;

    if (type.toLowerCase() === "number") {
      value = value.replace(",", ".");
    }

    switch (e.target.name) {
      case "title":
        {
          setTitle(value);
        }
        break;
      case "maker":
        {
          setMaker(value);
        }
        break;
      case "energy":
        {
          setEnergy(value);
        }
        break;
      case "protein":
        {
          setProtein(value);
        }
        break;
      case "fat":
        {
          setFat(value);
        }
        break;
      case "carb":
        {
          setCarb(value);
        }
        break;
    }
  };

  const handleCancel = () => {
    router.push(`/products`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const temp = {
      title,
      maker: maker || "",
      energy: energy || 0,
      protein: protein || 0,
      fat: fat || 0,
      carb: carb || 0,
    };

    if (product) {
      editProduct({ productId: product.id, ...temp });
    } else {
      addProduct(temp);
    }
    router.push(`/products`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack maxW="sm" m="auto">
        <FormControl>
          <FormLabel>Название</FormLabel>
          <Input
            type="text"
            name="title"
            size="sm"
            value={title}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Производитель</FormLabel>
          <Input
            type="text"
            name="maker"
            size="sm"
            value={maker}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Калории</FormLabel>
          <Input
            type="number"
            name="energy"
            size="sm"
            value={energy}
            onChange={handleChange}
            step="1"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Белки</FormLabel>
          <Input
            type="number"
            name="protein"
            size="sm"
            value={protein}
            onChange={handleChange}
            step=".01"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Жиры</FormLabel>
          <Input
            type="number"
            name="fat"
            size="sm"
            value={fat}
            onChange={handleChange}
            step=".01"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Углеводы</FormLabel>
          <Input
            type="number"
            name="carb"
            size="sm"
            value={carb}
            onChange={handleChange}
            step=".01"
          />
        </FormControl>
        <HStack>
          <Button type="submit" colorScheme="green">
            {product ? "Редактировать" : "Добавить"}
          </Button>
          <Button type="button" onClick={handleCancel} colorScheme="red">
            Отмена
          </Button>
        </HStack>
      </Stack>
    </form>
  );
}
