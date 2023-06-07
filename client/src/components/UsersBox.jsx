import {
  Avatar,
  AvatarBadge,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import axios from "axios";

const ChatsBox = ({
  userData,
  currentUserId,
  setCurrentChat,
  onlineUsers,
  selectedUser,
}) => {
  const checkOnlineStatus = () => {
    const online = onlineUsers.find((user) => user.userId === userData._id);
    return online ? true : false;
  };

  const createChat = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/chat/",
        { senderId: currentUserId, receiverId: userData._id },
        config
      );
      setCurrentChat(data);
    } catch (err) {
      console.log(err);
    }
  };
  const selectChat = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/chat/find/${currentUserId}/${userData._id}`
      );
      if (data) {
        setCurrentChat(data);
        return;
      }
      if (!data) {
        createChat();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      bg={selectedUser?._id == userData?._id ? "grey" : "#16171bff"}
      p={3}
      borderRadius={7}
      h={"90px"}
      alignItems={"center"}
      cursor={"pointer"}
      _hover={{ opacity: "0.8" }}
      onClick={selectChat}
    >
      <Avatar name={userData.name} mr={4}>
        <AvatarBadge
          boxSize="1em"
          bg={checkOnlineStatus() ? "green.500" : "red"}
        />
      </Avatar>
      <VStack spacing={2} align={"left"}>
        <Heading as="h3" size="md" fontWeight={"medium"}>
          {userData?.name}
        </Heading>
        {checkOnlineStatus() ? <Text>Online</Text> : <Text>Offline</Text>}
      </VStack>
    </Flex>
  );
};

export default ChatsBox;
