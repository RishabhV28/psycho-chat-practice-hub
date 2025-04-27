
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ApiKeyInputProps {
  apiKey: string;
  onSave: (key: string) => void;
}

const ApiKeyInput = ({ apiKey, onSave }: ApiKeyInputProps) => {
  const [isOpen, setIsOpen] = useState(!apiKey);
  const [inputKey, setInputKey] = useState(apiKey);

  const handleSave = () => {
    onSave(inputKey);
    setIsOpen(false);
  };

  return (
    <>
      {!apiKey && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md mb-4">
          <div className="flex items-center gap-2 text-yellow-800">
            <Info className="h-5 w-5" />
            <span>Please set your Gemini API key to enable chat functionality</span>
          </div>
        </div>
      )}
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Gemini API Key</DialogTitle>
            <DialogDescription>
              Please enter your Gemini API key to enable the chat functionality.
              The key will be stored in your browser's local storage.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <Input
              type="password"
              placeholder="Enter your Gemini API key"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
            />
            <Button onClick={handleSave} disabled={!inputKey}>Save API Key</Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {apiKey && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsOpen(true)}
          className="mb-4"
        >
          Update API Key
        </Button>
      )}
    </>
  );
};

export default ApiKeyInput;
