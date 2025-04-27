
interface ChatHeaderProps {
  patientName: string;
}

const ChatHeader = ({ patientName }: ChatHeaderProps) => {
  return (
    <div className="bg-white p-4 border-b">
      <h2 className="text-lg font-semibold">Chat with {patientName}</h2>
      <p className="text-sm text-muted-foreground">
        Practice your therapeutic conversation skills
      </p>
    </div>
  );
};

export default ChatHeader;
