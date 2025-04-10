
import React from 'react';
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AppOption {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface EventOption {
  id: string;
  name: string;
}

interface WorkflowStepEditorProps {
  stepId: string;
  type: 'trigger' | 'action';
  appId: string;
  eventId?: string;
  actionId?: string;
  availableApps: AppOption[];
  availableEvents?: EventOption[];
  availableActions?: EventOption[];
  onUpdate: (id: string, updates: Record<string, any>) => void;
}

const WorkflowStepEditor: React.FC<WorkflowStepEditorProps> = ({
  stepId,
  type,
  appId,
  eventId,
  actionId,
  availableApps,
  availableEvents,
  availableActions,
  onUpdate
}) => {
  return (
    <CardContent className="border-t p-4">
      <div className="space-y-4">
        <div>
          <Label>Select an app</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {availableApps.map(app => (
              <Button 
                key={app.id}
                variant={appId === app.id ? "default" : "outline"}
                className="flex flex-col h-auto py-3 justify-center items-center gap-2"
                onClick={() => onUpdate(stepId, { appId: app.id, eventId: undefined, actionId: undefined })}
              >
                {app.icon}
                <span className="text-xs">{app.name}</span>
              </Button>
            ))}
          </div>
        </div>
        
        {appId && type === 'trigger' && availableEvents && (
          <div>
            <Label>Select a trigger event</Label>
            <Select 
              value={eventId} 
              onValueChange={(value) => onUpdate(stepId, { eventId: value })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select an event" />
              </SelectTrigger>
              <SelectContent>
                {availableEvents.map((event) => (
                  <SelectItem key={event.id} value={event.id}>{event.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {appId && type === 'action' && availableActions && (
          <div>
            <Label>Select an action</Label>
            <Select 
              value={actionId} 
              onValueChange={(value) => onUpdate(stepId, { actionId: value })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select an action" />
              </SelectTrigger>
              <SelectContent>
                {availableActions.map((action) => (
                  <SelectItem key={action.id} value={action.id}>{action.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {((type === 'trigger' && eventId) || (type === 'action' && actionId)) && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500">Additional configuration options would appear here based on the selected {type === 'trigger' ? 'trigger' : 'action'}.</p>
          </div>
        )}
      </div>
    </CardContent>
  );
};

export default WorkflowStepEditor;
