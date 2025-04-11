
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Table, 
  Layout, 
  MessageSquare, 
  Canvas, 
  Users,
  PlusCircle
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type CreateOption = {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  path: string;
  color: string;
};

const createOptions: CreateOption[] = [
  {
    id: 'zaps',
    name: 'Zaps',
    icon: <Zap className="h-6 w-6" />,
    description: 'Create automated workflow that connects your apps and services.',
    path: '/workflow-builder',
    color: 'bg-orange-500',
  },
  {
    id: 'tables',
    name: 'Tables',
    icon: <Table className="h-6 w-6" />,
    description: 'Create tables to organize and analyze your data.',
    path: '/tables-builder',
    color: 'bg-blue-500',
  },
  {
    id: 'interfaces',
    name: 'Interfaces',
    icon: <Layout className="h-6 w-6" />,
    description: 'Create custom interfaces to visualize and interact with your data.',
    path: '/interface-builder',
    color: 'bg-purple-500',
  },
  {
    id: 'chatbot',
    name: 'Chatbot',
    icon: <MessageSquare className="h-6 w-6" />,
    description: 'Create intelligent chatbots that can answer questions and perform tasks.',
    path: '/chatbot-builder',
    color: 'bg-green-500',
  },
  {
    id: 'canvas',
    name: 'Canvas',
    icon: <Canvas className="h-6 w-6" />,
    description: 'Create visual canvases to map out processes and ideas.',
    path: '/canvas-builder',
    color: 'bg-pink-500',
  },
  {
    id: 'agents',
    name: 'Agents',
    icon: <Users className="h-6 w-6" />,
    description: 'Create AI agents that can automate complex tasks.',
    path: '/agents-builder',
    color: 'bg-indigo-500',
  },
];

const CreateMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="gap-2">
            <PlusCircle className="h-5 w-5" />
            Create
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New</DialogTitle>
            <DialogDescription>
              Select what you want to create
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {createOptions.map((option) => (
              <Link 
                key={option.id} 
                to={option.path}
                onClick={() => setIsOpen(false)}
              >
                <Card className="flex items-start p-4 hover:shadow-md transition-shadow cursor-pointer h-full">
                  <div className={`${option.color} rounded-full p-2 text-white mr-3`}>
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{option.name}</h3>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateMenu;
