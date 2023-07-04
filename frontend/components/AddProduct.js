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
  const [weight, setWeight] = useState("");
  const router = useRouter();
  const { mutate: addProduct } = useAddProduct();
  const { mutate: editProduct } = useEditProduct();

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setMaker(product.maker);
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
      case "weight":
        {
          setWeight(value);
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
      energy: energy || (product && product.energy) || 0,
      protein: protein || (product && product.protein) || 0,
      fat: fat || (product && product.fat) || 0,
      carb: carb || (product && product.carb) || 0,
      weight: weight || (product && product.weight) || 1,
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
            placeholder={product.energy}
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
            placeholder={product.protein}
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
            placeholder={product.fat}
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
            placeholder={product.carb}
            step=".01"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Вес</FormLabel>
          <Input
            type="number"
            name="weight"
            size="sm"
            value={weight}
            placeholder={product.weight}
            min="1"
            onChange={handleChange}
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
