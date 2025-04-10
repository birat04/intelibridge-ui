
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
  MoreHorizontal,
  ArrowRight,
  GripVertical,
  Save,
  Play,
  Github,
  Globe,
  Calendar
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import BackButton from "@/components/BackButton";
import { useToast } from "@/hooks/use-toast";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

// Define workflow step types
const STEP_TYPES = {
  TRIGGER: 'trigger',
  ACTION: 'action'
};

// App integration options
const AVAILABLE_APPS = [
  { id: 'email', name: 'Email', icon: <Mail className="h-5 w-5" />, color: 'bg-blue-500' },
  { id: 'database', name: 'Database', icon: <Database className="h-5 w-5" />, color: 'bg-green-500' },
  { id: 'ai', name: 'AI', icon: <Bot className="h-5 w-5" />, color: 'bg-purple-500' },
  { id: 'tasks', name: 'Tasks', icon: <ClipboardCheck className="h-5 w-5" />, color: 'bg-orange-500' },
  { id: 'notifications', name: 'Notifications', icon: <BellRing className="h-5 w-5" />, color: 'bg-pink-500' },
  { id: 'messages', name: 'Messages', icon: <MessageSquareText className="h-5 w-5" />, color: 'bg-indigo-500' },
  { id: 'calendar', name: 'Calendar', icon: <Calendar className="h-5 w-5" />, color: 'bg-cyan-500' },
  { id: 'web', name: 'Web', icon: <Globe className="h-5 w-5" />, color: 'bg-red-500' },
  { id: 'github', name: 'Github', icon: <Github className="h-5 w-5" />, color: 'bg-gray-700' },
];

// Event options for each app
const APP_EVENTS = {
  email: [
    { id: 'new-email', name: 'New Email Received' },
    { id: 'email-opened', name: 'Email Opened' },
    { id: 'email-clicked', name: 'Email Link Clicked' },
  ],
  database: [
    { id: 'record-created', name: 'Record Created' },
    { id: 'record-updated', name: 'Record Updated' },
    { id: 'record-deleted', name: 'Record Deleted' },
  ],
  ai: [
    { id: 'ai-analysis', name: 'AI Analysis Complete' },
    { id: 'sentiment-detected', name: 'Sentiment Detected' },
    { id: 'entity-extracted', name: 'Entity Extraction Complete' },
  ],
  tasks: [
    { id: 'task-created', name: 'Task Created' },
    { id: 'task-completed', name: 'Task Completed' },
    { id: 'task-assigned', name: 'Task Assigned' },
  ],
  notifications: [
    { id: 'notification-sent', name: 'Notification Sent' },
    { id: 'notification-clicked', name: 'Notification Clicked' },
  ],
  messages: [
    { id: 'message-received', name: 'Message Received' },
    { id: 'message-sent', name: 'Message Sent' },
    { id: 'keyword-detected', name: 'Keyword Detected' },
  ],
  calendar: [
    { id: 'event-created', name: 'Event Created' },
    { id: 'event-starting', name: 'Event Starting Soon' },
  ],
  web: [
    { id: 'form-submitted', name: 'Form Submitted' },
    { id: 'page-visited', name: 'Page Visited' },
  ],
  github: [
    { id: 'new-commit', name: 'New Commit' },
    { id: 'pull-request', name: 'Pull Request Created' },
    { id: 'issue-created', name: 'Issue Created' },
  ],
};

// Action options for each app
const APP_ACTIONS = {
  email: [
    { id: 'send-email', name: 'Send Email' },
    { id: 'update-email', name: 'Update Email Template' },
  ],
  database: [
    { id: 'create-record', name: 'Create Record' },
    { id: 'update-record', name: 'Update Record' },
    { id: 'delete-record', name: 'Delete Record' },
  ],
  ai: [
    { id: 'analyze-text', name: 'Analyze Text' },
    { id: 'generate-response', name: 'Generate AI Response' },
    { id: 'translate-text', name: 'Translate Text' },
  ],
  tasks: [
    { id: 'create-task', name: 'Create Task' },
    { id: 'complete-task', name: 'Complete Task' },
    { id: 'assign-task', name: 'Assign Task' },
  ],
  notifications: [
    { id: 'send-notification', name: 'Send Notification' },
    { id: 'schedule-notification', name: 'Schedule Notification' },
  ],
  messages: [
    { id: 'send-message', name: 'Send Message' },
    { id: 'update-chat', name: 'Update Chat' },
  ],
  calendar: [
    { id: 'create-event', name: 'Create Event' },
    { id: 'update-event', name: 'Update Event' },
    { id: 'delete-event', name: 'Delete Event' },
  ],
  web: [
    { id: 'post-data', name: 'Post Data to Webhook' },
    { id: 'fetch-data', name: 'Fetch Data from API' },
  ],
  github: [
    { id: 'create-issue', name: 'Create Issue' },
    { id: 'create-pr', name: 'Create Pull Request' },
    { id: 'add-comment', name: 'Add Comment' },
  ],
};

interface WorkflowStep {
  id: string;
  type: string;
  appId: string;
  eventId?: string;
  actionId?: string;
  name: string;
  description: string;
  config: Record<string, any>;
}

// Draggable Step Component
const DraggableStep = ({ step, index, isEditing, onEdit, onRemove, onUpdate }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: step.id });
  
  const style = {
    transform: transform ? `translate3d(0, ${transform.y}px, 0)` : undefined,
    transition,
  };
  
  const app = AVAILABLE_APPS.find(app => app.id === step.appId);
  const iconColor = app?.color || (step.type === STEP_TYPES.TRIGGER ? 'bg-blue-500' : 'bg-green-500');
  
  const getActionOrEventName = () => {
    if (step.type === STEP_TYPES.TRIGGER && step.eventId) {
      return APP_EVENTS[step.appId]?.find(event => event.id === step.eventId)?.name || 'Choose an event';
    } else if (step.type === STEP_TYPES.ACTION && step.actionId) {
      return APP_ACTIONS[step.appId]?.find(action => action.id === step.actionId)?.name || 'Choose an action';
    }
    return step.type === STEP_TYPES.TRIGGER ? 'Choose an event' : 'Choose an action';
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-2">
      <Card className={`${isEditing ? 'border-primary ring-1 ring-primary' : ''}`}>
        <CardHeader className="flex flex-row items-center justify-between p-4 cursor-grab">
          <div className="flex items-center gap-3">
            <div {...attributes} {...listeners} className="cursor-grab">
              <GripVertical className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </div>
            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${iconColor}`}>
              {app ? app.icon : (step.type === STEP_TYPES.TRIGGER ? <Mail className="h-5 w-5" /> : <Bot className="h-5 w-5" />)}
            </div>
            <div>
              <CardTitle className="text-sm">
                {step.type === STEP_TYPES.TRIGGER ? 'Trigger' : `Action ${index}`}
              </CardTitle>
              <p className="text-xs text-gray-500">
                {app?.name ? `${app.name}: ${getActionOrEventName()}` : step.description}
              </p>
            </div>
          </div>
          <div className="flex">
            <Button variant="ghost" size="icon" onClick={() => onEdit(step.id)}>
              <Settings className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onRemove(step.id)}>
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(step.id)}>
                  <Settings className="h-4 w-4 mr-2" /> Configure
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        
        {isEditing && (
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
                      onClick={() => onUpdate({
                        ...step,
                        appId: app.id,
                        name: app.name,
                        eventId: undefined,
                        actionId: undefined,
                        description: `${step.type === STEP_TYPES.TRIGGER ? 'When' : 'Then'} ${app.name}`,
                      })}
                    >
                      {app.icon}
                      <span className="text-xs">{app.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
              
              {step.appId && (
                <div>
                  <Label>
                    {step.type === STEP_TYPES.TRIGGER ? 'Select a trigger event' : 'Select an action'}
                  </Label>
                  <Select 
                    value={step.type === STEP_TYPES.TRIGGER ? step.eventId : step.actionId}
                    onValueChange={(value) => {
                      if (step.type === STEP_TYPES.TRIGGER) {
                        const eventName = APP_EVENTS[step.appId]?.find(event => event.id === value)?.name;
                        onUpdate({
                          ...step,
                          eventId: value,
                          description: `When: ${eventName || value}`
                        });
                      } else {
                        const actionName = APP_ACTIONS[step.appId]?.find(action => action.id === value)?.name;
                        onUpdate({
                          ...step,
                          actionId: value,
                          description: `Do: ${actionName || value}`
                        });
                      }
                    }}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder={step.type === STEP_TYPES.TRIGGER ? "Select a trigger event" : "Select an action"} />
                    </SelectTrigger>
                    <SelectContent>
                      {step.type === STEP_TYPES.TRIGGER ? (
                        APP_EVENTS[step.appId]?.map((event) => (
                          <SelectItem key={event.id} value={event.id}>{event.name}</SelectItem>
                        ))
                      ) : (
                        APP_ACTIONS[step.appId]?.map((action) => (
                          <SelectItem key={action.id} value={action.id}>{action.name}</SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {/* Configuration fields would go here based on the selected app and event/action */}
              {(step.type === STEP_TYPES.TRIGGER && step.eventId) || (step.type === STEP_TYPES.ACTION && step.actionId) ? (
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Additional configuration options would appear here based on the selected {step.type === STEP_TYPES.TRIGGER ? 'trigger' : 'action'}.</p>
                </div>
              ) : null}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

const WorkflowBuilder: React.FC = () => {
  const [workflowName, setWorkflowName] = useState('Untitled workflow');
  const [steps, setSteps] = useState<WorkflowStep[]>([]);
  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('builder');
  const { toast } = useToast();
  
  // Set up DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );
  
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
    setEditingStepId(newStep.id);
  };
  
  const removeStep = (id: string) => {
    setSteps(steps.filter(step => step.id !== id));
    if (editingStepId === id) {
      setEditingStepId(null);
    }
  };
  
  const updateStep = (updatedStep: WorkflowStep) => {
    setSteps(steps.map(step => step.id === updatedStep.id ? updatedStep : step));
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = steps.findIndex(step => step.id === active.id);
      const newIndex = steps.findIndex(step => step.id === over.id);
      
      const newSteps = [...steps];
      const [movedStep] = newSteps.splice(oldIndex, 1);
      newSteps.splice(newIndex, 0, movedStep);
      
      setSteps(newSteps);
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
    if (steps.length === 0) {
      toast({
        title: "Cannot test workflow",
        description: "Please add at least one step to your workflow.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Test successful",
      description: "Your workflow test was completed successfully.",
    });
  };

  const hasTrigger = steps.some(step => step.type === STEP_TYPES.TRIGGER);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white p-4 shadow-sm sticky top-0 z-10">
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
            <Button variant="outline" onClick={testWorkflow}>
              <Play className="mr-2 h-4 w-4" />
              Test
            </Button>
            <Button onClick={saveWorkflow}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
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
          <div className="flex gap-4">
            {/* Sidebar with templates */}
            <div className="w-64 bg-white border rounded-md shadow-sm p-4 hidden md:block">
              <div className="mb-4">
                <h3 className="font-medium mb-2">Templates</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-left">
                    <Mail className="mr-2 h-4 w-4" />
                    Email notification
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <Database className="mr-2 h-4 w-4" />
                    Save form to database
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <Bot className="mr-2 h-4 w-4" />
                    AI content generation
                  </Button>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <h3 className="font-medium mb-2">Steps</h3>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left"
                    onClick={() => addStep(STEP_TYPES.TRIGGER)}
                    disabled={hasTrigger}
                  >
                    <PlusCircle className="mr-2 h-4 w-4 text-blue-500" />
                    Add Trigger
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left"
                    onClick={() => addStep(STEP_TYPES.ACTION)}
                    disabled={!hasTrigger}
                  >
                    <PlusCircle className="mr-2 h-4 w-4 text-green-500" />
                    Add Action
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Main workflow builder area */}
            <div className="flex-1 bg-white border rounded-md shadow-sm">
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
                <div className="p-6">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    modifiers={[restrictToVerticalAxis]}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext items={steps.map(step => step.id)} strategy={verticalListSortingStrategy}>
                      {steps.map((step, index) => (
                        <div key={step.id}>
                          {/* Connect lines between steps */}
                          {index > 0 && (
                            <div className="flex justify-center py-2">
                              <div className="flex items-center text-gray-400">
                                <div className="h-6 border-l-2 border-gray-300"></div>
                                <ArrowRight className="h-4 w-4" />
                                <div className="h-6 border-l-2 border-gray-300"></div>
                              </div>
                            </div>
                          )}
                          
                          <DraggableStep
                            step={step}
                            index={index}
                            isEditing={editingStepId === step.id}
                            onEdit={(id) => setEditingStepId(id)}
                            onRemove={removeStep}
                            onUpdate={updateStep}
                          />
                        </div>
                      ))}
                    </SortableContext>
                  </DndContext>
                  
                  {/* Add next step button */}
                  {steps.length > 0 && (
                    <div className="flex justify-center pt-4">
                      <Button 
                        variant="outline" 
                        className="border-dashed" 
                        onClick={() => addStep(STEP_TYPES.ACTION)}
                        disabled={!hasTrigger}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Action Step
                      </Button>
                    </div>
                  )}
                </div>
              )}
              
              {/* Mobile steps panel */}
              <div className="md:hidden p-4 border-t">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 justify-center"
                    onClick={() => addStep(STEP_TYPES.TRIGGER)}
                    disabled={hasTrigger}
                  >
                    <PlusCircle className="mr-2 h-4 w-4 text-blue-500" />
                    Add Trigger
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 justify-center"
                    onClick={() => addStep(STEP_TYPES.ACTION)}
                    disabled={!hasTrigger}
                  >
                    <PlusCircle className="mr-2 h-4 w-4 text-green-500" />
                    Add Action
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Help text */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3 text-sm text-gray-500">
                <div className="bg-blue-100 text-blue-700 p-2 rounded-md">
                  <PlusCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="mb-1"><strong>How Zap workflows work:</strong></p>
                  <p>Each workflow starts with a trigger (when something happens) and follows with one or more actions (then do this). Drag to reorder steps.</p>
                </div>
              </div>
            </CardContent>
          </Card>
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
              <div className="space-y-2">
                <Label htmlFor="folderSelect">Folder</Label>
                <Select defaultValue="default">
                  <SelectTrigger>
                    <SelectValue placeholder="Select folder" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Folder</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">Organize your workflows into folders.</p>
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

