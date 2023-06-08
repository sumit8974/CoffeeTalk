import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Spinner,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const history = useNavigate();

  const handleLogin = async () => {
    console.log(import.meta.env.VITE_SERVICE_URL);
    setLoading(true);
    if (email === "" || password === "") {
      toast({
        title: "Fill all the details",
        status: "error",
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
        "api/user/login",
        { email, password },
        config
      );
      toast({
        title: "Login Successfull",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
      localStorage.setItem("CoffeeTalkUserInfo", JSON.stringify(data));
      setLoading(false);
      setTimeout(() => {
        history("/chat");
      }, 1000);
    } catch (err) {
      toast({
        title: "Error Occured",
        description: "Check the credentails...",
        status: "error",
        isClosable: true,
        duration: 3000,
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
              color={"white"}
              size="sm"
              p="20px"
              onClick={handleClick}
              bg={"#16171bff"}
              _hover={{ bg: "#16171bff", opacity: "0.7" }}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        style={{ marginTop: "15px" }}
        bg={"#9F7AEA"}
        _hover={{ bg: "#9F7AEA", opacity: "0.7" }}
        size="md"
        variant="solid"
        width={"100%"}
        onClick={handleLogin}
      >
        {loading ? <Spinner /> : "Login"}
      </Button>
    </VStack>
  );
};

export default Login;
