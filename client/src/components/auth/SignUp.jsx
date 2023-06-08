import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/validateEmail";

const SignUp = () => {
  const API_URL = import.meta.env.VITE_SERVICE_URL;
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useNavigate();
  const handleSignUp = async () => {
    setLoading(true);
    if (userName === "" || password === "" || email === "") {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      toast({
        title: "Provide a valid email...",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${API_URL}/api/user/register`,
        { name: userName, password, email },
        config
      );
      toast({
        title: "User create successfully",
        status: "success",
        duration: 3000,
        isClosable: "true",
      });
      localStorage.setItem("CoffeeTalkUserInfo", JSON.stringify(data));
      setLoading(false);
      setTimeout(() => {
        history("/chat");
      }, 1000);
    } catch (err) {
      toast({
        title: "Error occured",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
  };
  const handleClick = () => {
    setShow(!show);
  };
  return (
    <VStack color="black" spacing={3}>
      <FormControl>
        <FormLabel color="white">User Name</FormLabel>
        <Input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          borderColor={"#16171bff"}
          _hover={{ borderColor: "#16171bff" }}
          color="white"
        />
      </FormControl>
      <FormControl>
        <FormLabel color="white">Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          borderColor={"#16171bff"}
          _hover={{ borderColor: "#16171bff" }}
          color="white"
        />
      </FormControl>
      <FormControl>
        <FormLabel color="white">Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            borderColor={"#16171bff"}
            _hover={{ borderColor: "#16171bff" }}
            color="white"
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.8rem"
              size="sm"
              p="20px"
              onClick={handleClick}
              bg={"#16171bff"}
              color={"white"}
              _hover={{ bg: "#16171bff", opacity: "0.8" }}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        style={{ marginTop: "15px" }}
        size="md"
        variant="solid"
        width={"100%"}
        onClick={handleSignUp}
        bg={"#9F7AEA"}
        _hover={{ bg: "#9F7AEA", opacity: "0.7" }}
      >
        {loading ? <Spinner /> : "Signup"}
      </Button>
    </VStack>
  );
};

export default SignUp;
