
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Mail, Send, HelpCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Support = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
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
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to submit a support request",
        variant: "destructive",
      });
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Create support ticket in Supabase
      const { error } = await supabase
        .from('support_tickets')
        .insert({
          user_id: user.id,
          subject,
          description: message,
          status: 'open',
          priority: subject.includes("Deposit") || subject.includes("Withdrawal") ? 'high' : 'medium'
        });
        
      if (error) throw error;
      
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
    } catch (error: any) {
      console.error("Error submitting support request:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Open chat support directly
  const handleStartChat = () => {
    // We'll implement real-time chat in the ChatPanel component
    // For now, we'll just direct them to the dashboard with chat open
    navigate("/dashboard", { state: { openChat: true } });
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
          <Button className="w-full" onClick={handleStartChat}>Start Chat</Button>
        </Card>

        <Card className="p-6 bg-[#121214] border-white/10">
          <div className="flex items-center mb-4">
            <Mail className="w-6 h-6 text-primary mr-2" />
            <h2 className="text-lg font-semibold text-white">Email Support</h2>
          </div>
          <p className="text-gray-400 mb-4">Send us an email and we'll respond within 24 hours</p>
          <Button 
            className="w-full"
            onClick={() => window.location.href = "mailto:support@example.com"}
          >
            Contact Support
          </Button>
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
              disabled={submitting}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Message</label>
            <textarea
              className="w-full h-32 bg-[#1A1A1C] border border-white/10 rounded-lg p-3 text-white resize-none"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={submitting}
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
          
          <Button type="submit" className="w-full" disabled={submitting}>
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </form>
      </Card>
      
      <Card className="p-6 bg-[#121214] border-white/10 mt-6">
        <div className="flex items-center mb-4">
          <HelpCircle className="w-6 h-6 text-primary mr-2" />
          <h2 className="text-lg font-semibold text-white">FAQ</h2>
        </div>
        <div className="space-y-4">
          <div className="border-b border-white/10 pb-3">
            <h3 className="text-white font-medium mb-2">How do I make a deposit?</h3>
            <p className="text-gray-400 text-sm">To make a deposit, please submit a support request first, then go to your wallet and create a deposit request. Our administrators will review and approve it.</p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h3 className="text-white font-medium mb-2">How do withdrawals work?</h3>
            <p className="text-gray-400 text-sm">Contact support before submitting a withdrawal. After creating your support ticket, go to your wallet and submit the withdrawal request. An administrator will review and process it.</p>
          </div>
          <div>
            <h3 className="text-white font-medium mb-2">How long does approval take?</h3>
            <p className="text-gray-400 text-sm">Deposit and withdrawal approvals typically take 1-2 business days. You'll receive a notification when your transaction has been processed.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Support;
