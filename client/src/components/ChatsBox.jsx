import {
  Avatar,
  AvatarBadge,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatsBox = ({ currentUserId, chat, online }) => {
  const [userData, setUserData] = useState(null);
  const API_URL = import.meta.env.VITE_SERVICE_URL;
  const userId = chat?.members?.find((id) => id !== currentUserId);
  const getUserData = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${API_URL}/api/user/get-user`,
        { id: userId },
        config
      );
      setUserData(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserData();
  }, [chat, currentUserId]);
  return (
    <Flex
      bg="#16171bff"
      p={3}
      borderRadius={7}
      h={"90px"}
      alignItems={"center"}
      cursor={"pointer"}
      _hover={{ opacity: "0.8" }}
    >
      <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" mr={4}>
        <AvatarBadge boxSize="1em" bg={online ? "green.500" : "red"} />
      </Avatar>
      <VStack spacing={2} align={"left"}>
        <Heading as="h3" size="md" fontWeight={"medium"}>
          {userData?.name}
        </Heading>
        {online ? <Text>Online</Text> : <Text>Offline</Text>}
      </VStack>
    </Flex>
  );
};

export default ChatsBox;
