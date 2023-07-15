import { Flex, HStack, Text, IconButton } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

export default function Item({ title, text, actions }) {
  const { handleEdit, handleDelete, handleTitleClick, handleTextClick } =
    actions || {};

  const titleContent =
    typeof title === "string" ? (
      <Text onClick={handleTitleClick} cursor={handleTitleClick && "pointer"}>
        {title}
      </Text>
    ) : (
      title
    );

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      my="2"
      border="1px"
      p="2"
      borderColor="gray.200"
    >
      {titleContent}
      <HStack>
        <Text
          as="b"
          width="100px"
          align="right"
          pr="2"
          fontSize="sm"
          onClick={handleTextClick}
          cursor={handleTitleClick && "pointer"}
        >
          {text}
        </Text>
        {handleEdit && (
          <IconButton onClick={handleEdit} size="sm" icon={<EditIcon />} />
        )}
        {handleDelete && (
          <IconButton
            onClick={handleDelete}
            size="sm"
            colorScheme="red"
            icon={<DeleteIcon />}
          />
        )}
      </HStack>
    </Flex>
  );
}
