import React from "react";

// import send icon from react-icons/fa
// import { FaPaperPlane } from "react-icons/fa";
import SendIcon from "@mui/icons-material/Send";

const ChatInput = ({ inputMessage, setInputMessage, sendMessage }) => {
  return (
    <div className="chat-input">
      <textarea
        placeholder="Type a message"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (inputMessage) {
              sendMessage();
            }
          }
        }}
        style={{ fontSize: "18px" }}
      />

      <button onClick={sendMessage} disabled={!inputMessage}>
        <SendIcon />
      </button>
    </div>
  );
};

export default ChatInput;
