"use client";

import { Container, Box } from "@chakra-ui/react";
import AddGroupForm from "@/components/AddGroupForm";
import AmountItem from "@/components/AmountItem";
import GroupList from "@/components/GroupList";
import { useGroupsQuery } from "@/hooks";

export default function GroupListPage() {
  const { data, isLoading, isError } = useGroupsQuery();

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Произошла ошибка...";
  }

  return (
    <main>
      <Container maxW="container.lg">
        <Box border="1px" my="1" borderColor="gray.200">
          <AmountItem amount={data.amount} />
        </Box>
        <GroupList groups={data.groups} />
        <AddGroupForm />
      </Container>
    </main>
  );
}
