
import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

const ChatPanel = ({ isOpen }: { isOpen: boolean }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [supportOnline, setSupportOnline] = useState(false);

  // Auto-scroll to the bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulated check if support is online - in a real app, this would use real-time status
  useEffect(() => {
    // In a real implementation, this would connect to a real-time service
    const checkSupportStatus = () => {
      // Simulate support being online during business hours (9 AM - 5 PM)
      const now = new Date();
      const hour = now.getHours();
      const isBusinessHours = hour >= 9 && hour < 17;
      setSupportOnline(isBusinessHours);
    };

    checkSupportStatus();
    const interval = setInterval(checkSupportStatus, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          content: "Welcome to support! How can we help you today?",
          sender: "support",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !user) return;
    
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    
    try {
      // Store the message in the support_tickets table
      const { error } = await supabase
        .from('support_tickets')
        .insert({
          user_id: user.id,
          subject: 'Chat Support', 
          description: newMessage,
          priority: 'medium',
          status: 'open'
        });
        
      if (error) throw error;
      
      // Simulate support response after a short delay
      setTimeout(() => {
        const responseContent = supportOnline
          ? "Thanks for your message. Our support team is reviewing it and will get back to you soon."
          : "Our support team is currently offline. We've received your message and will respond when we return.";
        
        const supportMessage: Message = {
          id: crypto.randomUUID(),
          content: responseContent,
          sender: 'support',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, supportMessage]);
      }, 1000);
      
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-6 bottom-24 w-80 md:w-96 h-96 bg-[#121214] border border-white/10 rounded-lg shadow-xl flex flex-col z-40">
      <div className="p-3 border-b border-white/10 bg-[#1A1A1C] rounded-t-lg">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${supportOnline ? 'bg-green-500' : 'bg-amber-500'}`}></div>
          <h3 className="text-white font-medium">Support {supportOnline ? '(Online)' : '(Offline)'}</h3>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-3">
        <div className="flex flex-col space-y-3">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`max-w-[85%] p-3 rounded-lg ${
                msg.sender === 'user' 
                  ? 'bg-primary/20 ml-auto' 
                  : 'bg-[#1A1A1C] mr-auto'
              }`}
            >
              <p className="text-white text-sm">{msg.content}</p>
              <p className="text-xs text-gray-400 mt-1">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="bg-[#1A1A1C] border-white/10"
        />
        <Button type="submit" size="icon" disabled={!newMessage.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatPanel;
