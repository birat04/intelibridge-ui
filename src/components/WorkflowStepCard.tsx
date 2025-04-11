
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Trash2, MoreHorizontal, GripVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface WorkflowStepCardProps {
  id: string;
  type: 'trigger' | 'action';
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  index: number;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  isEditing?: boolean;
  isDraggable?: boolean;
}

const WorkflowStepCard: React.FC<WorkflowStepCardProps> = ({
  id,
  type,
  title,
  description,
  icon,
  iconColor,
  index,
  onEdit,
  onRemove,
  isEditing = false,
  isDraggable = false,
}) => {
  return (
    <Card className={`${isEditing ? 'border-primary ring-1 ring-primary' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {isDraggable && (
            <div className="cursor-grab">
              <GripVertical className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </div>
          )}
          <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${iconColor}`}>
            {icon}
          </div>
          <div>
            <CardTitle className="text-sm">
              {type === 'trigger' ? 'Trigger' : `Action ${index}`}
            </CardTitle>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
        </div>
        <div className="flex">
          <Button variant="ghost" size="icon" onClick={() => onEdit(id)}>
            <Settings className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onRemove(id)}>
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(id)}>
                <Settings className="h-4 w-4 mr-2" /> Configure
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
    </Card>
  );
};

export default WorkflowStepCard;
