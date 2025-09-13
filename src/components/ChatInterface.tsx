import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, ArrowLeft, Bot, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatInterfaceProps {
  onBack: () => void;
}

export const ChatInterface = ({ onBack }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your Smart Campus Assistant. I can help you with information about schedules, facilities, dining, library services, and administrative procedures. What would you like to know?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Mock responses for demonstration
  const mockResponses = {
    schedules: "I can help you with class schedules! Here are some things I can assist with:\n\n• Check your personal class timetable\n• Find exam dates and times\n• View the academic calendar\n• Get information about registration deadlines\n\nTo connect to your actual schedule, you'll need to integrate with your campus student information system.",
    
    facilities: "I can help you navigate campus facilities! Here's what I can do:\n\n• Provide campus maps and building locations\n• Help you find specific rooms or offices\n• Share building hours and accessibility information\n• Direct you to parking areas\n\nWhich building or facility are you looking for?",
    
    dining: "Here's information about campus dining options:\n\n• Main Cafeteria: Open 7 AM - 9 PM\n• Student Union Food Court: Open 10 AM - 10 PM\n• Coffee Shop: Open 6 AM - 6 PM\n• Grab & Go Market: Open 24/7\n\nToday's specials include vegetarian and gluten-free options. Would you like specific menu information?",
    
    library: "The campus library services include:\n\n• Main Library: Open 24/7 during finals week\n• Study rooms available for reservation\n• Computer lab access with student ID\n• Research assistance available\n• Printing and scanning services\n\nWould you like me to help you reserve a study room or find specific resources?",
    
    administration: "I can help with administrative information:\n\n• Registration procedures and deadlines\n• Tuition payment information\n• Campus policies and procedures\n• Contact information for departments\n• Form submissions and requirements\n\nWhat specific administrative task can I help you with?",
    
    default: "I understand you're looking for campus information. I can help with:\n\n• 📅 Schedules and academic calendar\n• 🏢 Facilities and campus maps\n• 🍽️ Dining options and menus\n• 📚 Library services and study spaces\n• ⚙️ Administrative procedures\n\nCould you be more specific about what you'd like to know?"
  };

  const getResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('schedule') || lowerMessage.includes('class') || lowerMessage.includes('exam')) {
      return mockResponses.schedules;
    } else if (lowerMessage.includes('building') || lowerMessage.includes('room') || lowerMessage.includes('map') || lowerMessage.includes('facility')) {
      return mockResponses.facilities;
    } else if (lowerMessage.includes('food') || lowerMessage.includes('dining') || lowerMessage.includes('cafeteria') || lowerMessage.includes('menu')) {
      return mockResponses.dining;
    } else if (lowerMessage.includes('library') || lowerMessage.includes('study') || lowerMessage.includes('book')) {
      return mockResponses.library;
    } else if (lowerMessage.includes('registration') || lowerMessage.includes('admin') || lowerMessage.includes('policy') || lowerMessage.includes('procedure')) {
      return mockResponses.administration;
    } else {
      return mockResponses.default;
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getResponse(newMessage);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="min-h-screen chat-gradient">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <Card className="p-4 mb-6 shadow-soft border-0 bg-card/90 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={onBack}
                className="hover:bg-muted"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <div className="p-2 campus-gradient rounded-lg">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold">Smart Campus Assistant</h2>
                  <p className="text-sm text-muted-foreground">Online • Ready to help</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Chat Messages */}
        <Card className="shadow-medium border-0 bg-card/90 backdrop-blur-sm overflow-hidden">
          <ScrollArea className="h-[60vh] p-6" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'campus-gradient text-white'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    <div className={`p-4 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <p className="whitespace-pre-line text-sm">{message.content}</p>
                      <p className={`text-xs mt-2 opacity-70`}>
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3 max-w-[80%]">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full campus-gradient text-white flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="p-4 rounded-2xl bg-muted">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-6 border-t bg-muted/20">
            <div className="flex space-x-3">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about schedules, facilities, dining, library, or admin procedures..."
                className="flex-1 bg-background/50 border-border/50 focus:border-primary"
                disabled={isTyping}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || isTyping}
                className="campus-gradient hover:shadow-soft transition-all duration-200"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {[
            "Library hours",
            "Campus map",
            "Today's menu",
            "Exam schedule",
            "Registration help"
          ].map((action) => (
            <Button
              key={action}
              variant="outline"
              size="sm"
              onClick={() => {
                setNewMessage(action);
                setTimeout(() => handleSendMessage(), 100);
              }}
              className="hover:bg-muted transition-colors"
            >
              {action}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};