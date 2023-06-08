import React from "react";
import { Flex, Icon, Image, Text, useToast } from "@chakra-ui/react";
import { UserState } from "../../context/UserProvider";
import { FiLogOut } from "react-icons/fi";
import { Tooltip } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { user } = UserState();
  const toast = useToast();
  const history = useNavigate();
  const LogOutClick = () => {
    localStorage.removeItem("CoffeeTalkUserInfo");
    toast({
      title: "Logout Success...",
      status: "success",
      isClosable: true,
      duration: 3000,
    });
    setTimeout(() => {
      history("/auth");
    }, 2000);
  };
  return (
    <Flex
      py={{ base: 2 }}
      px={{ base: 3 }}
      minH={"60px"}
      borderStyle={"solid"}
      align={"center"}
      bg={"#16171bff"}
      color="white"
      justifyContent={"space-between"}
    >
      <Flex align={"center"}>
        <Image
          src="/images/coffeetalk1.png"
          w={"60px"}
          h={"50px"}
          cursor={"pointer"}
        />
        <Text
          textAlign={{ base: "center", md: "left" }}
          fontWeight={"medium"}
          fontSize={"2xl"}
          cursor={"pointer"}
        >
          CoffeeTalk
        </Text>
      </Flex>
      <Flex align={"center"}>
        {user ? <Text mr={3}>Welcome! {user.name}</Text> : <Text>No user</Text>}
        <Tooltip label="Log Out" hasArrow>
          <Icon boxSize={8} cursor={"pointer"} mt={2} onClick={LogOutClick}>
            <FiLogOut />
          </Icon>
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default Navbar;
