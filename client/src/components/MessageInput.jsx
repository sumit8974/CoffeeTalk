import { Box, Button, Flex, Icon, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import InputEmoji from "react-input-emoji";
import { MessageState } from "../../context/MessageProvider";
import axios from "axios";
const MessageInput = ({ currentUserId, chat, setSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");
  const { messages, setMessages } = MessageState();
  // const handleChange = (newMessage) => {
  //   setNewMessage(newMessage);
  // };
  const handleSend = async () => {
    // send message to database mongoDB
    if (newMessage === "") {
      return;
    }
    const message = {
      senderId: currentUserId,
      text: newMessage,
      chatId: chat._id,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "api/message",
        { senderId: currentUserId, text: newMessage, chatId: chat._id },
        config
      );
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
    // send message to socket server
    const receiverId = chat.members.find((id) => id !== currentUserId);
    setSendMessage({ ...message, receiverId });
  };
  return (
    <Flex
      p={2}
      alignItems={"center"}
      justifyContent={"space-between"}
      w={"100%"}
      gap={1}
    >
      <Box flex={17} maxH={"auto"} maxW={"auto"} mr={1}>
        <Input
          outline={"none"}
          borderColor={"white"}
          focusBorderColor="white"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />
        {/* <InputEmoji
          value={newMessage}
          onChange={handleChange}
          theme="black"
          fontSize={17}
        /> */}
      </Box>
      <Button
        bg={"#16171bff"}
        _hover={{ bg: "#16171bff", opacity: "0.7" }}
        flex={1}
        onClick={handleSend}
        pl={6}
      >
        <Icon boxSize={8} cursor={"pointer"} mt={2}>
          <BsSend />
        </Icon>
      </Button>
    </Flex>
  );
};

export default MessageInput;
