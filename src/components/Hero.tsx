
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Code, Bot, CheckCircle2 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-gradient-to-b from-white to-blue-50/50">
      <div className="absolute inset-0 bg-hero-pattern opacity-70"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-intelibridge-blue/10 text-intelibridge-blue px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap size={16} className="animate-pulse" />
                <span>AI-Powered Automation for Modern Teams</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Automate Workflows with <span className="gradient-text">AI Intelligence</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
                InteliBridge connects your apps and services with intelligent automation. 
                Build powerful workflows without code and let AI handle the complex tasks.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-intelibridge-blue hover:bg-intelibridge-blue/90">
                Start for Free
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-intelibridge-blue text-intelibridge-blue hover:bg-intelibridge-blue/10">
                Watch Demo
              </Button>
            </div>
            
            <div className="pt-4">
              <p className="text-sm text-gray-500 mb-3">Trusted by innovative teams</p>
              <div className="flex flex-wrap gap-8 items-center opacity-70">
                <div className="font-bold text-gray-400">ACME Corp</div>
                <div className="font-bold text-gray-400">TechGiant</div>
                <div className="font-bold text-gray-400">InnovateLabs</div>
                <div className="font-bold text-gray-400">FutureTech</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-xl shadow-xl p-1 border border-gray-100 relative z-20">
              <div className="bg-gradient-to-br from-intelibridge-blue/5 to-intelibridge-teal/5 rounded-lg p-6 overflow-hidden">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  <div className="ml-2 text-sm text-gray-400">InteliBridge Workflow</div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-lg bg-intelibridge-blue flex items-center justify-center text-white">
                      <Bot size={20} />
                    </div>
                    <div className="flex-1 bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-100">
                      <div className="text-sm font-medium">Email Sentiment Analysis</div>
                      <div className="text-xs text-gray-500">Analyze customer emails and route to appropriate teams</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center my-2">
                    <div className="w-0.5 h-6 bg-gray-200"></div>
                  </div>
                  
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-lg bg-intelibridge-light-blue flex items-center justify-center text-white">
                      <Code size={20} />
                    </div>
                    <div className="flex-1 bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-100">
                      <div className="text-sm font-medium">Intelligent Categorization</div>
                      <div className="text-xs text-gray-500">AI categorizes requests by priority and type</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center my-2">
                    <div className="w-0.5 h-6 bg-gray-200"></div>
                  </div>
                  
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white">
                      <CheckCircle2 size={20} />
                    </div>
                    <div className="flex-1 bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-100">
                      <div className="text-sm font-medium">Automated Response</div>
                      <div className="text-xs text-gray-500">Generate personalized responses based on context</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-intelibridge-teal/20 rounded-xl z-10"></div>
            <div className="absolute -bottom-8 -right-8 w-full h-full bg-intelibridge-light-blue/20 rounded-xl z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
