
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// This matches the WorkflowStep interface in WorkflowBuilder
interface WorkflowStep {
  id: string;
  type: string;
  name: string;
  description: string;
  config: Record<string, any>;
}

interface WorkflowStepEditorProps {
  step: WorkflowStep;
  onSave: (updatedStep: WorkflowStep) => void;
  onCancel: () => void;
}

const WorkflowStepEditor: React.FC<WorkflowStepEditorProps> = ({
  step,
  onSave,
  onCancel
}) => {
  const [editedStep, setEditedStep] = useState<WorkflowStep>({...step});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedStep(prev => ({...prev, [name]: value}));
  };

  const handleTypeChange = (value: string) => {
    setEditedStep(prev => ({...prev, type: value}));
  };

  const handleConfigChange = (key: string, value: any) => {
    setEditedStep(prev => ({
      ...prev,
      config: {
        ...prev.config,
        [key]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedStep);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Edit Step</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={editedStep.name}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={editedStep.description}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="type">Type</Label>
          <Select
            value={editedStep.type}
            onValueChange={handleTypeChange}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trigger">Trigger</SelectItem>
              <SelectItem value="action">Action</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {editedStep.type === 'trigger' && (
          <div>
            <Label htmlFor="triggerConfig">Trigger Configuration</Label>
            <Input
              id="mailbox"
              name="mailbox"
              value={editedStep.config.mailbox || ''}
              onChange={(e) => handleConfigChange('mailbox', e.target.value)}
              placeholder="Mailbox (e.g. inbox)"
              className="mt-1"
            />
          </div>
        )}
        
        {editedStep.type === 'action' && (
          <div>
            <Label htmlFor="actionConfig">Action Configuration</Label>
            <Input
              id="table"
              name="table"
              value={editedStep.config.table || ''}
              onChange={(e) => handleConfigChange('table', e.target.value)}
              placeholder="Table name"
              className="mt-1 mb-2"
            />
            <Input
              id="model"
              name="model"
              value={editedStep.config.model || ''}
              onChange={(e) => handleConfigChange('model', e.target.value)}
              placeholder="Model (for AI actions)"
              className="mb-1"
            />
          </div>
        )}
        
        <div className="flex justify-end gap-2 mt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};

export default WorkflowStepEditor;
