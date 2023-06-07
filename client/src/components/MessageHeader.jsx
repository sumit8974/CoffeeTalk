import { Avatar, Box, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
const MessageHeader = ({
  chatHeader,
  setCurrentChat,
  setSelectedUser,
  selectedUser,
}) => {
  return (
    <Box
      p={2}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      w={"100%"}
    >
      <Icon
        boxSize={8}
        cursor={"pointer"}
        mt={2}
        onClick={() => {
          setCurrentChat(null);
          setSelectedUser(null);
        }}
      >
        <BiArrowBack />
      </Icon>
      <Text>{chatHeader?.name}</Text>
      <Avatar
        name={selectedUser?.name}
        mr={3}
        ml={2}
        cursor={"pointer"}
      ></Avatar>
    </Box>
  );
};

export default MessageHeader;
