
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import ApiKeyInput from "@/components/ApiKeyInput";
import { useGeminiChat } from "@/hooks/useGeminiChat";

interface ChatInterfaceProps {
  scenarioId: string;
  patientName: string;
}

const ChatInterface = ({ scenarioId, patientName }: ChatInterfaceProps) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isResponding, sendMessage, apiKey, saveApiKey } = useGeminiChat(patientName, scenarioId);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === "" || !apiKey) return;
    sendMessage(input);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
      <div className="bg-white p-4 border-b">
        <h2 className="text-lg font-semibold">Chat with {patientName}</h2>
        <p className="text-sm text-muted-foreground">
          Practice your therapeutic conversation skills
        </p>
      </div>

      <div className="p-4">
        <ApiKeyInput apiKey={apiKey} onSave={saveApiKey} />
      </div>

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

      <div className="p-4 border-t bg-white">
        <div className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={apiKey ? "Type your response..." : "Please enter your API key to start chatting"}
            className="min-h-[60px] resize-none flex-grow"
            disabled={!apiKey || isResponding}
          />
          <Button
            onClick={handleSendMessage}
            disabled={input.trim() === "" || !apiKey || isResponding}
            className="bg-psycho-500 hover:bg-psycho-600 self-end"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
