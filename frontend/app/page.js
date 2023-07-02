"use client";

import AddGroupForm from "@/components/AddGroupForm";
import GroupList from "@/components/GroupList";
import { useGroupsQuery } from "@/hooks";
import Spinner from "@/components/Spinner";
import ErrorAlert from "@/components/ErrorAlert";
import { useEffect } from "react";
import { useStore } from "@/store";

export default function GroupListPage() {
  const { data, status, error } = useGroupsQuery();
  const setAmount = useStore((state) => state.setAmount);

  useEffect(() => {
    if (data) {
      setAmount(data.amount);
    }
  }, [data]);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <ErrorAlert message={error.message} />;
  }

  return (
    <>
      <GroupList groups={data.groups} />
      <AddGroupForm />
    </>
  );
}
