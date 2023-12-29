import React from "react";

const ChatComponent: React.FC = () => {
  return (
    <iframe
      src="https://app.airops.com/public_apps/1beaa6a5-a983-4135-a657-f0f4e201d2b6/run"
      title="Chat Iframe"
      style={{
        width: "100%",
        height: "600px", // You can adjust the height as needed
        border: "none",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)", // Box shadow effect
      }}
    />
  );
};

export default ChatComponent;
