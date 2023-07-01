"use client";

import { Container, Center } from "@chakra-ui/react";
import AddGroupForm from "@/components/AddGroupForm";
import AmountItem from "@/components/AmountItem";
import GroupList from "@/components/GroupList";
import { useGroupsQuery } from "@/hooks";
import Spinner from "@/components/Spinner";

export default function GroupListPage() {
  const { data, isLoading, isError } = useGroupsQuery();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return "Произошла ошибка...";
  }

  return (
    <main>
      <Container maxW="container.lg">
        <Center border="1px" my="1" borderColor="gray.200">
          <AmountItem amount={data.amount} />
        </Center>
        <GroupList groups={data.groups} />
        <AddGroupForm />
      </Container>
    </main>
  );
}
