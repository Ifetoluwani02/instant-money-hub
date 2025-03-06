
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Mail, Send } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Support = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Get initial values from location state if available
  useEffect(() => {
    if (location.state) {
      if (location.state.subject) {
        setSubject(location.state.subject);
      }
      if (location.state.message) {
        setMessage(location.state.message);
      }
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim()) {
      toast({
        title: "Error",
        description: "Please enter a subject",
        variant: "destructive",
      });
      return;
    }
    
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would handle the support request submission
    // For this implementation we'll just show a success message
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible",
    });
    
    // If this was a deposit or withdrawal request, go back to wallet
    if (subject.includes("Deposit") || subject.includes("Withdrawal")) {
      navigate("/wallet");
    }
    
    setSubject("");
    setMessage("");
  };

  // Redirect to login if not authenticated
  if (!user) {
    navigate("/auth");
    return null;
  }

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
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Subject</label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-[#1A1A1C] border-white/10"
              placeholder="What is your message about?"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Message</label>
            <textarea
              className="w-full h-32 bg-[#1A1A1C] border border-white/10 rounded-lg p-3 text-white resize-none"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          
          {(subject.includes("Deposit") || subject.includes("Withdrawal")) && (
            <div className="bg-[#1e1e20] p-4 rounded-md border border-primary/20">
              <p className="text-sm text-gray-300">
                <strong>Important:</strong> After submitting this request, please go back to the wallet
                section and submit your transaction. Our administrators will review and approve it.
              </p>
            </div>
          )}
          
          <Button type="submit" className="w-full">
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Support;
