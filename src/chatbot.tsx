import React, { useState } from "react";
import { Chatbot as SisenseChatbot } from "@sisense/sdk-ui/ai";

interface ChatbotProps {
  width: number;
  height: number;
  onClose: () => void; // Add onClose prop for closing the Chatbot
}

const Chatbot: React.FC<ChatbotProps> = ({ width, height, onClose }) => {
  // State to manage the visibility of the Chatbot content
  const [isContentVisible, setIsContentVisible] = useState(true);

  // Custom logic for handling the close action
  const handleChatbotClose = () => {
    setIsContentVisible(false);
    onClose();
  };

  return (
    <div>
      {isContentVisible && (
        <div>
          {/* Add your Chatbot content and functionality here */}
          <SisenseChatbot
            width={width}
            height={height}
            // Add any other props or configuration specific to the Sisense Chatbot component
          />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
