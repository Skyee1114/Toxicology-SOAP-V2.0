import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import { MyContext } from "../context/MyContext";
import ChatApp from "./Chatbot/ChatApp";

const ChatGpt = () => {
  const { data } = useContext(MyContext);

  const [chatGptData, setChatGptData] = useState(null);
  return (
    <Box sx={{ m: 2 }}>
      <ChatApp data={data} />
    </Box>
  );
};

export default ChatGpt;
