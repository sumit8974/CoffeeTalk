import axios from "axios";

const API = axios.create({
  baseURL: "https://coffeetalk-chat-service-3uzg.onrender.com/api",
});

export const getMessages = (id) => API.get(`/message/${id}`);
