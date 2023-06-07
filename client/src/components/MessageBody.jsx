import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getMessages } from "../api/MessagesRequest";
import { format } from "timeago.js";
import { MessageState } from "../../context/MessageProvider";
const MessageBody = ({
  chat,
  currentUserId,
  setChatHeader,
  receivedMessage,
}) => {
  const [userData, setUserData] = useState(null);
  const { messages, setMessages } = MessageState();

  useEffect(() => {
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUserId);

    const getUserData = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          "api/user/get-user",
          { id: userId },
          config
        );
        setUserData(data);
        setChatHeader(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUserId]);
  //fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);
  return (
    <>
      {messages?.map((message, index) => (
        <Flex
          justifyContent={message.senderId == currentUserId ? "right" : "left"}
          px={2}
          key={index}
          mb={3}
          mx={1}
        >
          <Box
            borderRadius={10}
            bg={message.senderId == currentUserId ? "#16171bff" : "#9F7AEA"}
            p={4}
            display={"block"}
            textAlign={"left"}
            minW={32}
            maxW={"70%"}
            cursor={"pointer"}
          >
            <Text>{message.text}</Text>
            <Text mt={3} textAlign={"right"} fontSize={"sm"}>
              {format(message.createdAt)}
            </Text>
          </Box>
        </Flex>
      ))}
    </>
  );
};

export default MessageBody;
