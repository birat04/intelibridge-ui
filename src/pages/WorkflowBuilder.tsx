
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  PlusCircle, 
  ChevronDown, 
  ChevronRight,
  Mail, 
  Database, 
  Bot, 
  ClipboardCheck, 
  BellRing, 
  MessageSquareText,
  Trash2,
  Settings,
  MoreHorizontal
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import BackButton from "@/components/BackButton";
import { useToast } from "@/hooks/use-toast";

// Define workflow step types
const STEP_TYPES = {
  TRIGGER: 'trigger',
  ACTION: 'action'
};

// App integration options
const AVAILABLE_APPS = [
  { id: 'email', name: 'Email', icon: <Mail className="h-5 w-5" /> },
  { id: 'database', name: 'Database', icon: <Database className="h-5 w-5" /> },
  { id: 'ai', name: 'AI', icon: <Bot className="h-5 w-5" /> },
  { id: 'tasks', name: 'Tasks', icon: <ClipboardCheck className="h-5 w-5" /> },
  { id: 'notifications', name: 'Notifications', icon: <BellRing className="h-5 w-5" /> },
  { id: 'messages', name: 'Messages', icon: <MessageSquareText className="h-5 w-5" /> },
];

interface WorkflowStep {
  id: string;
  type: string;
  appId: string;
  name: string;
  description: string;
  config: Record<string, any>;
}

const WorkflowBuilder: React.FC = () => {
  const [workflowName, setWorkflowName] = useState('Untitled workflow');
  const [steps, setSteps] = useState<WorkflowStep[]>([]);
  const [editingStepIndex, setEditingStepIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('builder');
  const { toast } = useToast();
  
  const addStep = (type: string) => {
    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      type,
      appId: '',
      name: type === STEP_TYPES.TRIGGER ? 'When this happens...' : 'Do this...',
      description: 'Choose an app and event',
      config: {}
    };
    
    setSteps([...steps, newStep]);
    setEditingStepIndex(steps.length);
  };
  
  const removeStep = (index: number) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
    setEditingStepIndex(null);
  };
  
  const updateStep = (index: number, updatedStep: WorkflowStep) => {
    const newSteps = [...steps];
    newSteps[index] = updatedStep;
    setSteps(newSteps);
  };
  
  const selectApp = (index: number, appId: string) => {
    const step = steps[index];
    const app = AVAILABLE_APPS.find(app => app.id === appId);
    
    if (step && app) {
      updateStep(index, {
        ...step,
        appId,
        name: app.name,
        description: `${step.type === STEP_TYPES.TRIGGER ? 'When' : 'Then'} ${app.name}`,
      });
    }
  };
  
  const saveWorkflow = () => {
    // Here you would save the workflow data to your backend
    toast({
      title: "Workflow saved",
      description: "Your workflow has been saved successfully.",
    });
  };
  
  const testWorkflow = () => {
    toast({
      title: "Test successful",
      description: "Your workflow test was completed successfully.",
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white p-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <BackButton to="/dashboard" />
            <div className="flex flex-col">
              <Input 
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                className="font-bold text-xl border-0 p-0 h-auto"
              />
              <div className="flex items-center text-sm text-gray-500">
                <Badge className="mr-2 bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                Last edited just now
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={testWorkflow}>Test</Button>
            <Button onClick={saveWorkflow}>Save</Button>
          </div>
        </div>
      </header>

      <Tabs defaultValue="builder" value={activeTab} onValueChange={setActiveTab} className="container mx-auto py-4">
        <TabsList>
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="builder" className="space-y-6 mt-4">
          <div className="bg-white border rounded-md shadow-sm">
            {steps.length === 0 ? (
              <div className="p-12 text-center">
                <h3 className="text-xl font-bold mb-2">Start building your workflow</h3>
                <p className="text-gray-500 mb-4">Add a trigger to begin your automation</p>
                <Button size="lg" onClick={() => addStep(STEP_TYPES.TRIGGER)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Trigger
                </Button>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {steps.map((step, index) => (
                  <div key={step.id}>
                    {/* Connect lines between steps */}
                    {index > 0 && (
                      <div className="flex justify-center py-2">
                        <div className="h-8 border-l-2 border-dashed border-gray-300"></div>
                      </div>
                    )}
                    
                    <Card 
                      className={`cursor-pointer hover:border-primary transition-colors ${editingStepIndex === index ? 'border-primary ring-1 ring-primary' : ''}`}
                      onClick={() => setEditingStepIndex(index)}
                    >
                      <CardHeader className="flex flex-row items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${step.type === STEP_TYPES.TRIGGER ? 'bg-blue-500' : 'bg-green-500'}`}>
                            {step.appId ? AVAILABLE_APPS.find(app => app.id === step.appId)?.icon : 
                              (step.type === STEP_TYPES.TRIGGER ? <Mail /> : <Bot />)}
                          </div>
                          <div>
                            <CardTitle className="text-sm">
                              {step.type === STEP_TYPES.TRIGGER ? 'Trigger' : `Action ${index}`}
                            </CardTitle>
                            <p className="text-xs text-gray-500">{step.description}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => removeStep(index)}>
                              <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="h-4 w-4 mr-2" /> Configure
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                      
                      {editingStepIndex === index && (
                        <CardContent className="border-t p-4">
                          <div className="space-y-4">
                            <div>
                              <Label>Select an app</Label>
                              <div className="grid grid-cols-3 gap-2 mt-2">
                                {AVAILABLE_APPS.map(app => (
                                  <Button 
                                    key={app.id}
                                    variant={step.appId === app.id ? "default" : "outline"}
                                    className="flex flex-col h-auto py-3 justify-center items-center gap-2"
                                    onClick={() => selectApp(index, app.id)}
                                  >
                                    {app.icon}
                                    <span className="text-xs">{app.name}</span>
                                  </Button>
                                ))}
                              </div>
                            </div>
                            
                            {step.appId && (
                              <div>
                                <Label>Select an event</Label>
                                <Select>
                                  <SelectTrigger className="mt-2">
                                    <SelectValue placeholder="Select an event" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="new">New {step.name}</SelectItem>
                                    <SelectItem value="update">Updated {step.name}</SelectItem>
                                    <SelectItem value="delete">Deleted {step.name}</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  </div>
                ))}
                
                {/* Add next step button */}
                {steps.length > 0 && (
                  <div className="flex justify-center pt-4">
                    <Button 
                      variant="outline" 
                      className="border-dashed" 
                      onClick={() => addStep(STEP_TYPES.ACTION)}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Action Step
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workflowName">Workflow Name</Label>
                <Input id="workflowName" value={workflowName} onChange={(e) => setWorkflowName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workflowDescription">Description</Label>
                <Input id="workflowDescription" placeholder="Describe what this workflow does" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Status</Label>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                </div>
                <p className="text-sm text-gray-500">This workflow is currently active and running.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Workflow History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">No workflow runs yet. History will appear here after your workflow runs.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkflowBuilder;
