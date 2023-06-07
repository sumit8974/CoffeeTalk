import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "./pages/Chat/ChatPage";
import AuthPage from "./pages/Auth/AuthPage";
import ErrorPage from "./pages/Error/ErrorPage";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/auth" element={<AuthPage />} />
        <Route exact path="/chat" element={<ChatPage />} />
        <Route exact path="/error" element={<ErrorPage />} />
        <Route exact path="/" element={<Navigate to="../auth" />} />
        <Route exact path="*" element={<Navigate to="../error" />} />
      </Routes>
    </>
  );
}

export default App;
