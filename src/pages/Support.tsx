
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Mail } from "lucide-react";

const Support = () => {
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible",
    });
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Support</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6 bg-[#121214] border-white/10">
          <div className="flex items-center mb-4">
            <MessageCircle className="w-6 h-6 text-primary mr-2" />
            <h2 className="text-lg font-semibold text-white">Live Chat</h2>
          </div>
          <p className="text-gray-400 mb-4">Get instant help from our support team</p>
          <Button className="w-full">Start Chat</Button>
        </Card>

        <Card className="p-6 bg-[#121214] border-white/10">
          <div className="flex items-center mb-4">
            <Mail className="w-6 h-6 text-primary mr-2" />
            <h2 className="text-lg font-semibold text-white">Email Support</h2>
          </div>
          <p className="text-gray-400 mb-4">Send us an email and we'll respond within 24 hours</p>
          <Button className="w-full">Contact Support</Button>
        </Card>
      </div>

      <Card className="p-6 bg-[#121214] border-white/10">
        <h2 className="text-lg font-semibold text-white mb-4">Send us a message</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full h-32 bg-[#1A1A1C] border border-white/10 rounded-lg p-3 text-white resize-none"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" className="w-full">Send Message</Button>
        </form>
      </Card>
    </div>
  );
};

export default Support;
