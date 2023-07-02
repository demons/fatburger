"use client";

import { Stack, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { login } from "@/services";
import { useState } from "react";
import Button from "@/components/Button";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);

    if (!result) {
      alert("Неправильный логин или пароль");
      return;
    }

    location.href = "/";
    localStorage.setItem("user", JSON.stringify(result.user));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack maxW="sm" m="auto" my="2">
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            size="sm"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            size="sm"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="green">
          Войти
        </Button>
      </Stack>
    </form>
  );
}
