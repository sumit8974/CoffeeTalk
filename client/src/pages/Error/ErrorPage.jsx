import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const history = useNavigate();
  const handleClick = () => {
    history("/auth");
  };
  return (
    <Flex
      align={"center"}
      justifyContent={"center"}
      h="100vh"
      flexDirection={"column"}
    >
      <Heading mb="10px">Error 404</Heading>
      <Text mb="10px" fontWeight={"bold"}>
        Page not Found
      </Text>
      <Button colorScheme="blue" onClick={handleClick}>
        Go Home Page
      </Button>
    </Flex>
  );
};

export default ErrorPage;
