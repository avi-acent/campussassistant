import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Calendar, MapPin, BookOpen, Settings, Utensils } from "lucide-react";
import campusHero from "@/assets/campus-hero.jpg";

interface HeroSectionProps {
  onStartChat: () => void;
}

export const HeroSection = ({ onStartChat }: HeroSectionProps) => {
  const features = [
    {
      icon: Calendar,
      title: "Schedules",
      description: "Class timetables, exam dates, academic calendar"
    },
    {
      icon: MapPin,
      title: "Facilities",
      description: "Campus maps, building locations, room finder"
    },
    {
      icon: Utensils,
      title: "Dining",
      description: "Cafeteria menus, hours, dietary options"
    },
    {
      icon: BookOpen,
      title: "Library",
      description: "Hours, study spaces, resource availability"
    },
    {
      icon: Settings,
      title: "Administration",
      description: "Policies, procedures, contact information"
    }
  ];

  return (
    <div className="min-h-screen hero-gradient">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <div className="relative mb-8 overflow-hidden rounded-2xl shadow-strong">
            <img 
              src={campusHero} 
              alt="Modern campus building with students" 
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 campus-gradient opacity-20"></div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Smart Campus Assistant
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Your AI-powered guide to campus life. Get instant answers about schedules, facilities, dining, library services, and administrative procedures.
          </p>
          
          <Button 
            onClick={onStartChat}
            size="lg" 
            className="campus-gradient hover:shadow-medium transition-all duration-300 transform hover:scale-105 text-lg px-8 py-4 h-auto"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Start Chatting
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 shadow-soft hover:shadow-medium transition-all duration-300 transform hover:scale-105 border-0 bg-card/80 backdrop-blur-sm"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 rounded-lg campus-gradient">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Examples */}
        <Card className="p-8 shadow-medium border-0 bg-card/90 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-center mb-6 text-card-foreground">
            Try asking me about...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "What time does the library close today?",
              "Where is the computer science building?",
              "What's for lunch in the main cafeteria?",
              "When is my next chemistry exam?",
              "How do I register for courses?",
              "What study rooms are available?"
            ].map((example, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                onClick={onStartChat}
              >
                <p className="text-sm text-muted-foreground">"{example}"</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};