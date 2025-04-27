
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isDisabled: boolean;
  apiKey: string | null;
  isResponding: boolean;
}

const MessageInput = ({ onSendMessage, isDisabled, apiKey, isResponding }: MessageInputProps) => {
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() === "" || !apiKey) return;
    onSendMessage(input);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
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
  );
};

export default MessageInput;
