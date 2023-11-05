import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import { MyContext } from "../context/MyContext";
// import ChatUI from "./Chatbot/ChatUI";
import ChatApp from "./Chatbot/ChatApp";

const ChatGpt = () => {
  const { data } = useContext(MyContext);

  const [chatGptData, setChatGptData] = useState(null);
  const [chatGptLoader, setChatGptLoader] = useState(false);

  // useEffect(() => {
  //   const fetchChatGpt = async () => {
  //     setChatGptLoader(true);
  //     try {
  //       const response = await axios.post("/api/chatgpt_report/", {
  //         input: data,
  //       });
  //       setChatGptLoader(false);
  //       const responseObject = JSON.parse(response.data.response);
  //       const responseArray = Object.entries(responseObject).map(
  //         ([question, answer]) => ({
  //           question,
  //           answer,
  //         })
  //       );
  //       setChatGptData(responseArray);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchChatGpt();
  // }, []);

  console.log("hassan", chatGptData);

  const all = [
    {
      question:
        "Does the patient have exposed to any venomous animals? It is unknown whether the patient has been exposed to venomous animals.",
      answer: "The patient's tobacco usage or smoking habits are unknown.",
    },
    {
      question: "Does the patient expose any mushrooms or plants?",
      answer: "The patient's tobacco usage or smoking habits are unknown.",
    },
    {
      question:
        "It is unknown whether the patient has been exposed to venomous animals.",
      answer: "The patient's tobacco usage or smoking habits are unknown.",
    },
    {
      question: "Does the patient have any previous disease?",
      answer: "The patient's tobacco usage or smoking habits are unknown.",
    },
    {
      question: "Has the patient had any previous mental disorder?",
      answer: "The patient's tobacco usage or smoking habits are unknown.",
    },
    {
      question: "Does the patient have any known allergies?",
      answer: "The patient's tobacco usage or smoking habits are unknown.",
    },
    {
      question: "Does the patient smoke or use any tobacco products?",
      answer: "The patient's tobacco usage or smoking habits are unknown.",
    },
    {
      question: "Does the patient smoke or use any tobacco products?",
      answer: "The patient's tobacco usage or smoking habits are unknown.",
    },
    {
      question: "Does the patient smoke or use any tobacco products?",
      answer: "The patient's tobacco usage or smoking habits are unknown.",
    },
    {
      question: "Does the patient smoke or use any tobacco products?",
      answer: "The patient's tobacco usage or smoking habits are unknown.",
    },
    {
      question: "Does the patient smoke or use any tobacco products?",
      answer: "The patient's tobacco usage or smoking habits are unknown.",
    },
    {
      question: "Does the patient smoke or use any tobacco products?",
      answer: "The patient's tobacco usage or smoking habits are unknown.",
    },
    {
      question: "Does the patient smoke or use any tobacco products?",
      answer: "The patient's tobacco usage or smoking habits are unknown.",
    },
    {
      question: "Does the patient smoke or use any tobacco products?",
      answer: "The patient's tobacco usage or smoking habits are unknown.",
    },
  ];
  return (
    <Box sx={{ m: 2 }}>
      {/* {chatGptLoader ? (
        <p>Loading...</p>
      ) : (
        <div
          className="report"
          style={{
            color: "#fff",
            padding: 20,
            maxHeight: "100vh",
            overflow: "scroll",
            wordWrap: "break-word",
            width:"100%"
          }}
        >
          <pre className="report-txt" value={all}>
            {chatGptData && chatGptData.map((e, i) => (
              <div style={{ marginBottom: 50 }} key={e.question}>
                <p style={{ wordWrap: "break-word" }}>{`${i + 1}) ${
                  e.question
                }`}</p>
                <p>{e.answer}</p>
              </div>
            ))}
          </pre>
        </div>
      )} */}
      <ChatApp data={data}/>
    </Box>
  );
};

export default ChatGpt;
