
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Mail, 
  Database, 
  Bot, 
  ClipboardCheck, 
  ArrowRightCircle, 
  BellRing,
  MessageSquareText
} from 'lucide-react';

const WorkflowDemo: React.FC = () => {
  return (
    <section id="workflow" className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Visualize and Build <span className="gradient-text">Powerful Workflows</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Build intelligent automation workflows that connect your apps, data and AI in minutes.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-intelibridge-blue text-white p-4">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-red-400"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-400"></div>
              <div className="ml-2 text-sm">Customer Support Automation Workflow</div>
            </div>
          </div>
          
          <div className="p-6 md:p-10 overflow-x-auto">
            <div className="min-w-[700px] flex items-start justify-between gap-4">
              {/* Trigger */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-intelibridge-blue flex items-center justify-center text-white mb-3">
                  <Mail size={28} />
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-medium">New Support Email</h4>
                  <p className="text-xs text-gray-500 mt-1">Trigger</p>
                </div>
              </div>
              
              <ArrowRightCircle className="mx-4 text-gray-300 self-center mt-8" />
              
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-intelibridge-light-blue flex items-center justify-center text-white mb-3">
                  <Database size={28} />
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-medium">Store in Database</h4>
                  <p className="text-xs text-gray-500 mt-1">CRM Integration</p>
                </div>
              </div>
              
              <ArrowRightCircle className="mx-4 text-gray-300 self-center mt-8" />
              
              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-intelibridge-teal flex items-center justify-center text-white mb-3">
                  <Bot size={28} />
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-medium">AI Analysis</h4>
                  <p className="text-xs text-gray-500 mt-1">Sentiment & Intent</p>
                </div>
              </div>
              
              <ArrowRightCircle className="mx-4 text-gray-300 self-center mt-8" />
              
              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white mb-3">
                  <ClipboardCheck size={28} />
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-medium">Ticket Creation</h4>
                  <p className="text-xs text-gray-500 mt-1">Auto Categorized</p>
                </div>
              </div>
              
              <ArrowRightCircle className="mx-4 text-gray-300 self-center mt-8" />
              
              {/* Step 4 */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white mb-3">
                  <BellRing size={28} />
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-medium">Team Notification</h4>
                  <p className="text-xs text-gray-500 mt-1">Alert via Slack</p>
                </div>
              </div>
              
              <ArrowRightCircle className="mx-4 text-gray-300 self-center mt-8" />
              
              {/* Step 5 */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white mb-3">
                  <MessageSquareText size={28} />
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-medium">AI Response</h4>
                  <p className="text-xs text-gray-500 mt-1">Auto-Generated</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              This workflow automatically processes customer support emails, analyzes content with AI, and routes them to the right team.
            </div>
            <Link to="/workflow-builder">
              <Button className="whitespace-nowrap bg-intelibridge-blue hover:bg-intelibridge-blue/90">
                Try This Template
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-6">Ready to build your own intelligent workflows?</h3>
          <Link to="/workflow-builder">
            <Button size="lg" className="bg-intelibridge-blue hover:bg-intelibridge-blue/90">
              Start Building Now
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WorkflowDemo;
