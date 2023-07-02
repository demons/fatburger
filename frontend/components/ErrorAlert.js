import { Alert, AlertIcon } from "@chakra-ui/react";

export default function ErrorAlert({ message }) {
  return (
    <Alert status="error">
      <AlertIcon />
      {message}
    </Alert>
  );
}
