
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Send } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

interface ChatbotAssistantProps {
  onSuggestionApply: (suggestion: string) => void;
}

const ChatbotAssistant: React.FC<ChatbotAssistantProps> = ({ onSuggestionApply }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your workflow assistant. I can help you build your workflow by suggesting steps based on what you want to accomplish. What would you like to do?",
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
    };
    setMessages([...messages, newUserMessage]);
    setIsLoading(true);

    // Simulate AI response with pre-defined workflows
    setTimeout(() => {
      let responseContent = '';
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('email') && lowerInput.includes('notification')) {
        responseContent = "I can help you create an email notification workflow. Here's what I suggest:\n\n1. Start with an 'Email Received' trigger\n2. Add 'Filter by Subject' action\n3. Add 'Send Notification' action\n\nWould you like me to create this workflow for you?";
      } else if (lowerInput.includes('data') && lowerInput.includes('sync')) {
        responseContent = "For a data sync workflow, I recommend:\n\n1. Start with a 'Database Change' trigger\n2. Add 'Transform Data' action\n3. Add 'Update External System' action\n\nShall I set this up for you?";
      } else if (lowerInput.includes('customer') && lowerInput.includes('support')) {
        responseContent = "A customer support workflow could look like:\n\n1. Start with a 'New Support Ticket' trigger\n2. Add 'Sentiment Analysis' action using AI\n3. Add 'Categorize Ticket' action\n4. Add 'Assign to Agent' action\n\nWould you like me to build this workflow?";
      } else {
        responseContent = "I'd be happy to help with that. Could you describe what this workflow should accomplish? For example, what should trigger the workflow, and what actions should it take?";
      }
      
      const newBotMessage: Message = {
        id: Date.now().toString(),
        content: responseContent,
        isUser: false,
      };
      
      setMessages(prev => [...prev, newBotMessage]);
      setIsLoading(false);
      setInput('');
    }, 1500);
  };

  const handleApplySuggestion = (suggestion: string) => {
    onSuggestionApply(suggestion);
    toast({
      title: "Workflow Updated",
      description: "The suggested workflow has been applied.",
    });
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <span>Workflow Assistant</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isUser
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                {!message.isUser && message.content.includes('Would you like') && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2" 
                    onClick={() => handleApplySuggestion(message.content)}
                  >
                    Apply Suggestion
                  </Button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]"></div>
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want to automate..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatbotAssistant;
