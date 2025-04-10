
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/components/LoadingSpinner";
import { geminiService } from "@/services/geminiService";
import { Send } from "lucide-react";

interface Message {
  role: "user" | "model";
  content: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = { role: "user" as const, content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await geminiService.chat({
        messages: [...messages, userMessage],
        temperature,
      });
      
      setMessages(prev => [...prev, { role: "model", content: response }]);
    } catch (error) {
      console.error("Error in chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="card-glass p-4 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Chat</h1>
          <Button variant="outline" size="sm" onClick={clearChat}>
            Clear
          </Button>
        </div>

        {/* Chat Messages */}
        <div className="bg-background/40 backdrop-blur-md rounded-lg border border-border min-h-[400px] max-h-[600px] overflow-y-auto p-4 mb-4">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground h-full flex items-center justify-center">
              <p>Start a conversation by sending a message!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      message.role === "user"
                        ? "bg-primary text-white"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] px-4 py-2 rounded-lg bg-secondary text-secondary-foreground flex items-center">
                    <LoadingSpinner size="sm" text="" />
                    <span className="ml-2">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Temperature Control */}
        <div className="mb-4">
          <div className="space-y-2">
            <Label htmlFor="chat-temperature" className="text-sm">
              Temperature: {temperature.toFixed(1)}
            </Label>
            <Slider
              id="chat-temperature"
              min={0}
              max={1}
              step={0.1}
              value={[temperature]}
              onValueChange={(value) => setTemperature(value[0])}
            />
            <p className="text-xs text-muted-foreground">
              Lower values make responses more focused and deterministic, higher values make them more creative.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="resize-none"
            rows={2}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
