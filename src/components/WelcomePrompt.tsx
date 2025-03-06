
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

interface WelcomePromptProps {
  onSubmit: (name: string) => void;
}

const WelcomePrompt = ({ onSubmit }: WelcomePromptProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already completed the prompt
    const hasCompletedPrompt = localStorage.getItem('welcome_prompt_completed');
    
    if (!hasCompletedPrompt) {
      // Show prompt after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim()) {
      // Save to localStorage to avoid showing prompt again
      localStorage.setItem('welcome_prompt_completed', 'true');
      localStorage.setItem('user_name', name);
      
      // Call the onSubmit callback with the name
      onSubmit(name);
      
      // Hide the prompt
      setIsVisible(false);
      
      // Show success toast
      toast({
        title: "Welcome!",
        description: `Great to have you here, ${name}!`,
      });
    } else {
      // Show error toast if name is empty
      toast({
        title: "Name required",
        description: "Please enter your name to continue.",
        variant: "destructive",
      });
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('welcome_prompt_completed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 w-full max-w-md mx-4 relative animate-in fade-in slide-in-from-bottom-4 duration-300">
        <button 
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={18} />
        </button>
        
        <h2 className="text-2xl font-bold mb-2 text-secondary">Welcome to Instant Share Finance</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We'd like to personalize your experience. What's your name?
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full"
            autoFocus
          />
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              type="button" 
              onClick={handleDismiss}
              className="flex-1"
            >
              Skip
            </Button>
            <Button 
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WelcomePrompt;
