
import React from 'react';
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, PenTool, Square, Circle, Type, Image } from 'lucide-react';

const CanvasBuilder: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <BackButton to="/dashboard" className="mb-6" />
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Canvas Builder</h1>
          <Button className="bg-intelibridge-blue hover:bg-intelibridge-blue/90">
            <Plus className="h-4 w-4 mr-2" />
            Save Canvas
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <h2 className="font-semibold mb-4">Elements</h2>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Square className="h-4 w-4 mr-2" />
                    Rectangle
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Circle className="h-4 w-4 mr-2" />
                    Circle
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Type className="h-4 w-4 mr-2" />
                    Text
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Image className="h-4 w-4 mr-2" />
                    Image
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <PenTool className="h-4 w-4 mr-2" />
                    Draw
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-200 rounded-lg h-[600px] flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-xl font-medium mb-2">Canvas Area</h3>
                <p className="text-gray-500">Drag and drop elements from the sidebar to create your canvas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CanvasBuilder;
