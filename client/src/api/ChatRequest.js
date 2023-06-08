import axios from "axios";

const API = axios.create({
  baseURL: "https://coffeetalk-chat-service-3uzg.onrender.com/api",
});

export const userChats = (id) => API.get(`/chat/${id}`);
