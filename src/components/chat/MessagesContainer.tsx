
import { useEffect, useRef } from "react";
import ChatMessage from "@/components/ChatMessage";

interface Message {
  content: string;
  isUserMessage: boolean;
  sender: string;
  timestamp: Date;
}

interface MessagesContainerProps {
  messages: Message[];
  isResponding: boolean;
  patientName: string;
}

const MessagesContainer = ({ messages, isResponding, patientName }: MessagesContainerProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          content={message.content}
          isUserMessage={message.isUserMessage}
          sender={message.sender}
          timestamp={message.timestamp}
        />
      ))}
      {isResponding && (
        <div className="flex items-center text-sm text-muted-foreground">
          <div className="bg-gray-200 rounded-full p-2 mr-2 animate-pulse"></div>
          {patientName} is typing...
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesContainer;
