import React, { useState } from "react";
import Button from "@mui/material/Button";

interface Message {
  text: string;
  type: "user" | "assistant";
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");

  const apiKey = "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"; // Replace with your actual OpenAI API key
  const assistantId = "asst_jbNrZWCnKFBx7YrUhGoeOagx"; // Your assistant ID

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = async () => {
    setMessages((prevMessages) => [...prevMessages, { text: inputText, type: "user" }]);

    try {
      const response = await fetch(
        `https://api.openai.com/v1/assistants/asst_jbNrZWCnKFBx7YrUhGoeOagx/chat/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`,
          },
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content: "You are a helpful assistant.",
              },
              {
                role: "user",
                content: inputText,
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response from Assistant");
      }

      const jsonData = await response.json();
      const assistantResponse = jsonData["message"]?.content;

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: assistantResponse, type: "assistant" },
      ]);
    } catch (error: any) {
      console.error("Error communicating with Assistant:", error.message);
    }

    setInputText("");
  };

  return (
    <div>
      <div
        style={{
          height: "300px",
          border: "1px solid #ccc",
          overflowY: "scroll",
          padding: "10px",
          borderRadius: "10px",
          backgroundColor: "white",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)", // Box shadow effect
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              padding: "8px",
              textAlign: message.type === "user" ? "right" : "left",
              marginBottom: "10px",
              borderRadius: "10px",
              backgroundColor: message.type === "user" ? "#e0e0e0" : "#1976D2", // Primary color
              color: message.type === "user" ? "#000" : "#fff",
            }}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          style={{ width: "70%", padding: "8px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          style={{ color: "white", marginLeft: "10px" }}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatComponent;
