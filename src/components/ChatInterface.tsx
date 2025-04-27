
import MessagesContainer from "./chat/MessagesContainer";
import MessageInput from "./chat/MessageInput";
import ChatHeader from "./chat/ChatHeader";
import ApiKeyInput from "./ApiKeyInput";
import { useGeminiChat } from "@/hooks/useGeminiChat";

interface ChatInterfaceProps {
  scenarioId: string;
  patientName: string;
}

const ChatInterface = ({ scenarioId, patientName }: ChatInterfaceProps) => {
  const { messages, isResponding, sendMessage, apiKey, saveApiKey } = useGeminiChat(
    patientName,
    scenarioId
  );

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
      <ChatHeader patientName={patientName} />
      
      <div className="p-4">
        <ApiKeyInput apiKey={apiKey} onSave={saveApiKey} />
      </div>

      <MessagesContainer
        messages={messages}
        isResponding={isResponding}
        patientName={patientName}
      />

      <MessageInput
        onSendMessage={sendMessage}
        isDisabled={!apiKey}
        apiKey={apiKey}
        isResponding={isResponding}
      />
    </div>
  );
};

export default ChatInterface;
