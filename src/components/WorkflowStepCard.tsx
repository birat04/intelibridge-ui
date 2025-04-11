
import React from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Trash2, MoreHorizontal, GripVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// This is the new interface that matches how the component is used in WorkflowBuilder
interface WorkflowStep {
  id: string;
  type: string;
  name: string;
  description: string;
  config: Record<string, any>;
}

interface WorkflowStepCardProps {
  step: WorkflowStep;
  isActive?: boolean;
}

const WorkflowStepCard: React.FC<WorkflowStepCardProps> = ({
  step,
  isActive = false,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: step.id
  });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className={`${isActive ? 'border-primary ring-1 ring-primary' : ''} mb-2`}
      {...attributes}
    >
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="cursor-grab" {...listeners}>
            <GripVertical className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </div>
          <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${step.type === 'trigger' ? 'bg-blue-500' : 'bg-green-500'}`}>
            {step.type === 'trigger' ? (
              <Settings className="h-5 w-5" />
            ) : (
              <Settings className="h-5 w-5" />
            )}
          </div>
          <div>
            <CardTitle className="text-sm">
              {step.name}
            </CardTitle>
            <p className="text-xs text-gray-500">{step.description}</p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default WorkflowStepCard;
