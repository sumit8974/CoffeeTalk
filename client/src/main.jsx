import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import UserProvider from "../context/UserProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import MessageProvider from "../context/MessageProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <MessageProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </MessageProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
