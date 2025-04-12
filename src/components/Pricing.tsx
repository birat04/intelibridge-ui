
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from './ui/button';

const PricingTier = ({ 
  title, 
  price, 
  description, 
  features, 
  buttonText, 
  highlighted = false 
}: { 
  title: string; 
  price: string; 
  description: string; 
  features: string[]; 
  buttonText: string;
  highlighted?: boolean;
}) => {
  return (
    <div className={`rounded-lg border p-6 shadow-sm ${highlighted ? 'border-intelibridge-light-blue bg-intelibridge-blue/5' : 'border-border'}`}>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">{price}</span>
        {price !== 'Custom' && <span className="text-muted-foreground">/month</span>}
      </div>
      <p className="text-muted-foreground mb-6">{description}</p>
      <Button 
        className={`w-full mb-6 ${highlighted ? 'bg-intelibridge-blue hover:bg-intelibridge-blue/90' : ''}`} 
        variant={highlighted ? "default" : "outline"}
      >
        {buttonText}
      </Button>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="h-5 w-5 text-intelibridge-light-blue flex-shrink-0 mt-0.5" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that works best for your workflow needs. All plans include core features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingTier
            title="Starter"
            price="$29"
            description="Perfect for individuals and small teams getting started."
            buttonText="Get Started"
            features={[
              "5 workflows",
              "Basic automation",
              "Email support",
              "1 team member",
              "1,000 monthly operations"
            ]}
          />
          
          <PricingTier
            title="Professional"
            price="$79"
            description="Ideal for growing teams that need more power and flexibility."
            buttonText="Start Free Trial"
            highlighted={true}
            features={[
              "Unlimited workflows",
              "Advanced automation",
              "Priority support",
              "Up to 10 team members",
              "10,000 monthly operations",
              "Custom integrations",
              "Workflow analytics"
            ]}
          />
          
          <PricingTier
            title="Enterprise"
            price="Custom"
            description="For organizations with complex needs and large teams."
            buttonText="Contact Sales"
            features={[
              "Unlimited everything",
              "Dedicated account manager",
              "SLA guarantees",
              "Unlimited team members",
              "Unlimited monthly operations",
              "Custom development",
              "Advanced security features",
              "API access"
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;
