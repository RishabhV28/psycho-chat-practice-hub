
import { useState } from 'react';

interface ChatMessage {
  content: string;
  isUserMessage: boolean;
  sender: string;
  timestamp: Date;
}

export const useGeminiChat = (patientName: string, scenarioId: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isResponding, setIsResponding] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');

  const saveApiKey = (key: string) => {
    localStorage.setItem('gemini_api_key', key);
    setApiKey(key);
  };

  const sendMessage = async (userMessage: string) => {
    if (!apiKey) return;

    const newUserMessage: ChatMessage = {
      content: userMessage,
      isUserMessage: true,
      sender: "You",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsResponding(true);

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are acting as ${patientName}, a patient with the condition described in scenario ${scenarioId}. 
                     Respond to the therapist's message: ${userMessage}
                     Stay in character and provide realistic responses based on the patient's condition.`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        })
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        const botResponse: ChatMessage = {
          content: data.candidates[0].content.parts[0].text,
          isUserMessage: false,
          sender: patientName,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botResponse]);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsResponding(false);
    }
  };

  return {
    messages,
    isResponding,
    sendMessage,
    apiKey,
    saveApiKey
  };
};
