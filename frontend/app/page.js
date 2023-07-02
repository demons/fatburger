"use client";

import { Container, Center } from "@chakra-ui/react";
import AddGroupForm from "@/components/AddGroupForm";
import AmountItem from "@/components/AmountItem";
import GroupList from "@/components/GroupList";
import { useGroupsQuery } from "@/hooks";
import Spinner from "@/components/Spinner";
import ErrorAlert from "@/components/ErrorAlert";

export default function GroupListPage() {
  const { data, status, error } = useGroupsQuery();

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <ErrorAlert message={error.message} />;
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
