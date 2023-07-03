"use client";

import { Flex, Heading, HStack, Divider } from "@chakra-ui/react";
import AmountItem from "@/components/AmountItem";
import GroupItemList from "@/components/GroupItemList";
import NotFoundPage from "@/components/NotFoundPage";
import { useGroupQuery } from "@/hooks";
import { useEffect, useState } from "react";
import EditTitleForm from "@/components/EditTitleForm";
import { useUpdateGroup } from "@/hooks/group";
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";
import { useStore } from "@/store";

export default function Page({ params }) {
  const [state, setState] = useState("");
  const { groupId } = params;
  const { data, status } = useGroupQuery(groupId);
  const { mutate: updateGroup } = useUpdateGroup();
  const setAmount = useStore((state) => state.setAmount);

  useEffect(() => {
    if (data) {
      const { amount } = data;
      setAmount(amount);
    }
  }, [data]);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <NotFoundPage timeout={1500} />;
  }

  const { group } = data;
  const amount = {
    energy: group.energy,
    protein: group.protein,
    fat: group.fat,
    carb: group.carb,
  };

  const handleTitleApply = (title) => {
    updateGroup({ groupId, title });
    setState("");
  };

  const titleContent =
    state === "edit" ? (
      <EditTitleForm title={group.title} onApply={handleTitleApply} />
    ) : (
      <div className="title" onClick={() => setState("edit")}>
        {group.title}
      </div>
    );

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" my="1">
        <HStack>
          <Button href={`/`} colorScheme="green">
            Готово
          </Button>
          <Button href={`/groups/${groupId}/ingredients`}>
            Добавить ингредиент
          </Button>
          <Button href={`/groups/${groupId}/dishes`}>Добавить блюдо</Button>
        </HStack>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" my="3">
        <Heading as="h3" size="md">
          {titleContent}
        </Heading>
        <AmountItem amount={amount} />
      </Flex>
      <Divider />
      <GroupItemList groupItems={group.groupItems} isEditable={true} />
    </>
  );
}
