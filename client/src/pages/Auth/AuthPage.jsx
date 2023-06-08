import React, { useEffect } from "react";
import Login from "../../components/auth/Login";
import SignUp from "../../components/auth/SignUp";
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { UserState } from "../../../context/UserProvider";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { user } = UserState();
  const history = useNavigate();
  useEffect(() => {
    if (user) {
      history("/chat");
    }
  }, [user, history]);

  return (
    <Box h={"100vh"} bg={"#1d1e23ff"}>
      <Container maxW="xl" centerContent>
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          bg={"#1d1e23ff"}
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="5px"
          borderColor={"#16171bff"}
        >
          <Text fontSize="4xl" align="center" color={"white"}>
            Coffee Talk
          </Text>
        </Box>
        <Box
          bg="#1d1e23ff"
          w="100%"
          p={4}
          borderRadius="lg"
          borderWidth="5px"
          color="white"
          borderColor={"#16171bff"}
        >
          <Tabs variant="soft-rounded" colorScheme="purple">
            <TabList mb="1em">
              <Tab width="50%" borderWidth="2px" borderColor={"#16171bff"}>
                Log in
              </Tab>
              <Tab width="50%" borderWidth="2px" borderColor={"#16171bff"}>
                Sign up
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <SignUp />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
