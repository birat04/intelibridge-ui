
import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import BackButton from "@/components/BackButton";
import WorkflowStepCard from "@/components/WorkflowStepCard";
import WorkflowStepEditor from "@/components/WorkflowStepEditor";
import ChatbotAssistant from "@/components/ChatbotAssistant";
import { Button } from "@/components/ui/button";
import { Plus, Save, ArrowLeft, Bot, PencilLine } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type WorkflowStep = {
  id: string;
  type: string;
  name: string;
  description: string;
  config: Record<string, any>;
};

const initialSteps: WorkflowStep[] = [
  {
    id: '1',
    type: 'trigger',
    name: 'New Email Received',
    description: 'Triggers when a new email is received',
    config: { mailbox: 'inbox' }
  },
  {
    id: '2',
    type: 'action',
    name: 'Store in Database',
    description: 'Stores email data in the database',
    config: { table: 'emails' }
  },
  {
    id: '3',
    type: 'action',
    name: 'Analyze with AI',
    description: 'Processes content with AI for sentiment and intent',
    config: { model: 'gpt4' }
  }
];

const WorkflowBuilder: React.FC = () => {
  const [steps, setSteps] = useState<WorkflowStep[]>(initialSteps);
  const [activeStep, setActiveStep] = useState<WorkflowStep | null>(null);
  const [workflowName, setWorkflowName] = useState<string>("Customer Support Workflow");
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("manual");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setSteps((steps) => {
        const oldIndex = steps.findIndex((step) => step.id === active.id);
        const newIndex = steps.findIndex((step) => step.id === over.id);
        
        return arrayMove(steps, oldIndex, newIndex);
      });
    }
  };

  const handleStepClick = (step: WorkflowStep) => {
    setActiveStep(step);
  };

  const handleStepUpdate = (updatedStep: WorkflowStep) => {
    setSteps(steps.map(step => step.id === updatedStep.id ? updatedStep : step));
    setActiveStep(null);
    toast({
      title: "Step Updated",
      description: `"${updatedStep.name}" has been updated successfully.`,
    });
  };

  const handleAddStep = () => {
    const newStep: WorkflowStep = {
      id: `step-${Date.now()}`,
      type: 'action',
      name: 'New Step',
      description: 'Configure this step',
      config: {}
    };
    
    setSteps([...steps, newStep]);
    setActiveStep(newStep);
  };

  const handleSaveWorkflow = () => {
    toast({
      title: "Workflow Saved",
      description: `"${workflowName}" has been saved successfully.`,
    });
  };

  const handleChatbotSuggestion = (suggestion: string) => {
    // Parse the suggestion and create workflow steps
    if (suggestion.includes('email notification')) {
      const newSteps: WorkflowStep[] = [
        {
          id: `step-${Date.now()}-1`,
          type: 'trigger',
          name: 'Email Received',
          description: 'Triggers when a new email is received',
          config: { mailbox: 'inbox' }
        },
        {
          id: `step-${Date.now()}-2`,
          type: 'action',
          name: 'Filter by Subject',
          description: 'Filters emails based on the subject line',
          config: { contains: 'important' }
        },
        {
          id: `step-${Date.now()}-3`,
          type: 'action',
          name: 'Send Notification',
          description: 'Sends a notification to the user',
          config: { channel: 'email' }
        }
      ];
      setSteps(newSteps);
      setWorkflowName("Email Notification Workflow");
    } else if (suggestion.includes('data sync')) {
      const newSteps: WorkflowStep[] = [
        {
          id: `step-${Date.now()}-1`,
          type: 'trigger',
          name: 'Database Change',
          description: 'Triggers when database records are changed',
          config: { table: 'customers' }
        },
        {
          id: `step-${Date.now()}-2`,
          type: 'action',
          name: 'Transform Data',
          description: 'Transforms data to match external system',
          config: { format: 'JSON' }
        },
        {
          id: `step-${Date.now()}-3`,
          type: 'action',
          name: 'Update External System',
          description: 'Updates records in the external system',
          config: { system: 'CRM' }
        }
      ];
      setSteps(newSteps);
      setWorkflowName("Data Synchronization Workflow");
    } else if (suggestion.includes('customer support')) {
      const newSteps: WorkflowStep[] = [
        {
          id: `step-${Date.now()}-1`,
          type: 'trigger',
          name: 'New Support Ticket',
          description: 'Triggers when a new support ticket is created',
          config: { channel: 'all' }
        },
        {
          id: `step-${Date.now()}-2`,
          type: 'action',
          name: 'Sentiment Analysis',
          description: 'Analyzes ticket sentiment using AI',
          config: { model: 'gpt4' }
        },
        {
          id: `step-${Date.now()}-3`,
          type: 'action',
          name: 'Categorize Ticket',
          description: 'Categorizes the ticket based on content',
          config: { categories: ['billing', 'technical', 'feature'] }
        },
        {
          id: `step-${Date.now()}-4`,
          type: 'action',
          name: 'Assign to Agent',
          description: 'Assigns ticket to appropriate agent',
          config: { assignmentRule: 'category' }
        }
      ];
      setSteps(newSteps);
      setWorkflowName("Customer Support Workflow");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <BackButton to="/dashboard" className="mr-4" />
            <h1 className="text-2xl font-bold">Workflow Builder</h1>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddStep} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Step
            </Button>
            <Button onClick={handleSaveWorkflow} className="bg-intelibridge-blue hover:bg-intelibridge-blue/90">
              <Save className="h-4 w-4 mr-2" />
              Save Workflow
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="mb-4">
            <label htmlFor="workflowName" className="block text-sm font-medium mb-1">Workflow Name</label>
            <input
              id="workflowName"
              type="text"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mb-6"
        >
          <TabsList>
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <PencilLine className="h-4 w-4" />
              Manual Builder
            </TabsTrigger>
            <TabsTrigger value="chatbot" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              AI Assistant
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`${activeTab === "manual" ? "lg:col-span-2" : "hidden"}`}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Workflow Steps</h2>
              <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext 
                  items={steps.map(step => step.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-4">
                    {steps.map((step) => (
                      <div key={step.id} onClick={() => handleStepClick(step)}>
                        <WorkflowStepCard 
                          step={step} 
                          isActive={activeStep?.id === step.id}
                        />
                      </div>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>

              {steps.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500">No steps in this workflow yet.</p>
                  <Button onClick={handleAddStep} variant="outline" className="mt-4">Add Your First Step</Button>
                </div>
              )}
            </div>
          </div>

          <div className={`${activeTab === "chatbot" ? "lg:col-span-2" : "hidden"}`}>
            <div className="bg-white rounded-lg shadow-md p-6 h-[500px]">
              <ChatbotAssistant onSuggestionApply={handleChatbotSuggestion} />
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              {activeStep && activeTab === "manual" ? (
                <WorkflowStepEditor 
                  step={activeStep}
                  onSave={handleStepUpdate}
                  onCancel={() => setActiveStep(null)}
                />
              ) : activeTab === "manual" ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">Step Editor</h3>
                  <p className="text-gray-500">Select a step to edit its properties</p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">AI Workflow Builder</h3>
                  <p className="text-gray-500">Use the AI Assistant to create workflows in natural language</p>
                  <p className="text-gray-500 mt-4">Try saying:</p>
                  <ul className="text-gray-500 mt-2 text-left list-disc pl-8">
                    <li>Build me an email notification workflow</li>
                    <li>Create a data sync workflow</li>
                    <li>I need a customer support workflow</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
