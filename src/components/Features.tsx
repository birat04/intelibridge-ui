
import React from 'react';
import { 
  Bot, 
  Workflow, 
  Layers, 
  Zap, 
  LineChart, 
  ShieldCheck, 
  Clock, 
  Settings 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-full">
      <CardHeader className="pb-2">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-intelibridge-blue to-intelibridge-light-blue flex items-center justify-center text-white mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      title: "AI-Powered Automation",
      description: "Let intelligent algorithms analyze your data and automate complex decision-making processes.",
      icon: <Bot size={24} />,
    },
    {
      title: "Visual Workflow Builder",
      description: "Design powerful automation flows with our intuitive drag-and-drop interface, no coding required.",
      icon: <Workflow size={24} />,
    },
    {
      title: "Seamless Integrations",
      description: "Connect with 1000+ apps and services to create powerful cross-platform workflows.",
      icon: <Layers size={24} />,
    },
    {
      title: "Instant Deployment",
      description: "Build and deploy production-ready workflows in minutes, not days or weeks.",
      icon: <Zap size={24} />,
    },
    {
      title: "Advanced Analytics",
      description: "Gain valuable insights with real-time analytics to optimize your automation processes.",
      icon: <LineChart size={24} />,
    },
    {
      title: "Enterprise-Grade Security",
      description: "Rest easy with SOC 2 compliant infrastructure and end-to-end encryption for all your data.",
      icon: <ShieldCheck size={24} />,
    },
    {
      title: "Time-Saving Templates",
      description: "Get started quickly with pre-built templates for common business workflows.",
      icon: <Clock size={24} />,
    },
    {
      title: "Customizable Logic",
      description: "Define complex business rules and conditional logic to handle any scenario.",
      icon: <Settings size={24} />,
    },
  ];

  return (
    <section id="features" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Intelligent Features for <span className="gradient-text">Smarter Automation</span>
          </h2>
          <p className="text-gray-600 text-lg">
            InteliBridge combines cutting-edge AI with powerful automation tools to help your team work smarter, not harder.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
