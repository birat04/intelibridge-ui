import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Filter, Grid3X3, List, Clock, Tag, ExternalLink,
  MoreVertical, Calendar, ChevronDown, Home
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from '@/hooks/use-media-query';
import { Link } from 'react-router-dom';
import BackButton from "@/components/BackButton";

const data = [
  {
    id: 1,
    title: "Website Redesign",
    status: "In progress",
    priority: "High",
    createdAt: "2023-01-01",
  },
  {
    id: 2,
    title: "Mobile App Development",
    status: "Todo",
    priority: "High",
    createdAt: "2023-02-15",
  },
  {
    id: 3,
    title: "Backend API Development",
    status: "In progress",
    priority: "Medium",
    createdAt: "2023-03-01",
  },
  {
    id: 4,
    title: "Frontend Development",
    status: "Done",
    priority: "Low",
    createdAt: "2023-04-01",
  },
  {
    id: 5,
    title: "Database Design",
    status: "Todo",
    priority: "High",
    createdAt: "2023-05-01",
  },
  {
    id: 6,
    title: "UI/UX Design",
    status: "In progress",
    priority: "Medium",
    createdAt: "2023-06-01",
  },
  {
    id: 7,
    title: "Testing and QA",
    status: "Done",
    priority: "Low",
    createdAt: "2023-07-01",
  },
];

const Dashboard: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    setShowDrawer(isMobile);
  }, [isMobile]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white p-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <BackButton to="/" />
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <div className="flex gap-2 items-center">
            <Input type="search" placeholder="Search..." className="max-w-xs md:block hidden" />
            <Button variant="outline" size="sm" className="md:block hidden">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open user menu</span>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container mx-auto flex flex-1 flex-col md:flex-row gap-4 p-4">
        <aside className="w-full md:w-64 border rounded-md p-4 bg-white">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Project</h2>
            <Button variant="ghost" className="justify-start w-full">
              <Grid3X3 className="mr-2 h-4 w-4" />
              Overview
            </Button>
            <Button variant="ghost" className="justify-start w-full">
              <List className="mr-2 h-4 w-4" />
              List
            </Button>
            <Button variant="ghost" className="justify-start w-full">
              <Calendar className="mr-2 h-4 w-4" />
              Calendar
            </Button>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Tasks</h2>
            <Button variant="ghost" className="justify-start w-full">
              <Clock className="mr-2 h-4 w-4" />
              Today
            </Button>
            <Button variant="ghost" className="justify-start w-full">
              <Tag className="mr-2 h-4 w-4" />
              Tags
            </Button>
          </div>
        </aside>

        <main className="flex-1 bg-white border rounded-md p-4">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Tasks</h2>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Task</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" value="Pedro Duarte" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input id="username" value="@peduarte" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="inProgress">In Progress</TabsTrigger>
              <TabsTrigger value="todo">Todo</TabsTrigger>
              <TabsTrigger value="done">Done</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {data.map((item) => (
                  <Card key={item.id}>
                    <CardHeader>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>{item.createdAt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary">{item.priority}</Badge>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <p>{item.status}</p>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="inProgress" className="mt-4">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {data.filter((item) => item.status === "In progress").map((item) => (
                  <Card key={item.id}>
                    <CardHeader>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>{item.createdAt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary">{item.priority}</Badge>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <p>{item.status}</p>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
