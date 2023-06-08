import React, { Fragment, useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import { UserState } from "../../../context/UserProvider";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import ChatsBox from "../../components/ChatsBox";
import MessageHeader from "../../components/MessageHeader";
import MessageBody from "../../components/MessageBody";
import MessageInput from "../../components/MessageInput";
import UsersBox from "../../components/UsersBox";
import { userChats } from "../../api/ChatRequest";
import { io } from "socket.io-client";
import { MessageState } from "../../../context/MessageProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const { user } = UserState();
  const [chats, setChats] = useState([]);
  // const [user, setUser] = useState(null);
  const [chatHeader, setChatHeader] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { messages } = MessageState();

  const scroll = useRef();
  const socket = useRef();
  const history = useNavigate();
  useEffect(() => {
    // console.log(user);
    if (!user) {
      history("/auth");
      return;
    }
  }, [history]);
  useEffect(() => {
    if (!user) {
      return;
    }
    socket.current = io("https://coffeetalk-chat-service-3uzg.onrender.com");
    socket.current.emit("new-user-add", user?._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  //Send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current?.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  //Received message from socket server
  useEffect(() => {
    // console.log(socket);
    socket.current?.on("receive-message", (data) => {
      setReceivedMessage(data);
    });
  }, []);
  const getChats = async () => {
    try {
      const { data } = await userChats(user?._id);
      setChats(data);
    } catch (err) {
      console.log(err);
    }
  };

  //scroll to last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  //get all users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("api/user/get-allusers");
      setAllUsers(data.users);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getChats();
    getAllUsers();
  }, [user]);
  //check online user
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <Box>
      <Navbar />
      {/* Left Chat Panel */}
      <Flex
        minH={{ base: "92.1vh", md: "92vh" }}
        maxH={{ base: "92.1vh", md: "92vh" }}
        bg={"#1d1e23ff"}
        color={"white"}
        px={2}
        py={2}
        justifyContent={"space-between"}
      >
        <VStack
          gap={2}
          flex={1}
          align={"left"}
          px={2}
          py={2}
          display={{ base: `${currentChat ? "none" : "block"}`, md: "block" }}
          overflowY={"scroll"}
        >
          <Text fontSize={"12"} fontWeight={"light"} mb={2}>
            Users
          </Text>

          {allUsers?.map((newUser) => {
            {
              return newUser._id !== user._id ? (
                <div
                  key={newUser?._id}
                  onClick={() => {
                    setSelectedUser(newUser);
                  }}
                >
                  <UsersBox
                    key={newUser?._id}
                    userData={newUser}
                    currentUserId={user._id}
                    setCurrentChat={setCurrentChat}
                    onlineUsers={onlineUsers}
                    selectedUser={selectedUser}
                  />
                </div>
              ) : null;
            }
          })}
        </VStack>

        <Flex
          flex={{ base: 1, sm: 2, lg: 3 }}
          display={{ base: `${currentChat ? "flex" : "none"}`, md: "flex" }}
          borderWidth={3}
          borderRadius={7}
          borderColor={"#16171bff"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          maxW={{ base: "100%", md: "70%", lg: "85%" }}
        >
          <Flex flex={1} bg={"#16171bff"}>
            {currentChat ? (
              <MessageHeader
                chatHeader={chatHeader}
                setCurrentChat={setCurrentChat}
                setSelectedUser={setSelectedUser}
                selectedUser={selectedUser}
              />
            ) : null}
          </Flex>

          <div
            style={{
              flex: "10",
              display: "flex",
              flexDirection: "column",
              overflow: "scroll",
            }}
          >
            {currentChat ? (
              <div
                ref={scroll}
                style={{
                  backgroundColor: "#1d1e23ff",
                  padding: "5px 1px 0px 0px",
                }}
              >
                <MessageBody
                  chat={currentChat}
                  currentUserId={user?._id}
                  setChatHeader={setChatHeader}
                  receivedMessage={receivedMessage}
                />
              </div>
            ) : (
              <Text align={"center"}>Select a chat to start conversation</Text>
            )}
          </div>
          <Flex flex={1} borderTopWidth={3} borderColor={"#16171bff"} mt={1}>
            {currentChat ? (
              <MessageInput
                currentUserId={user?._id}
                chat={currentChat}
                setSendMessage={setSendMessage}
              />
            ) : null}
          </Flex>
        </Flex>
      </Flex>
      {/* Right Chat Panel */}
    </Box>
  );
};

export default ChatPage;
