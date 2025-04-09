
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Search, Plus, Edit, Trash2, Eye, Zap, ArrowRight, Settings, MoreHorizontal, Play, Pause, Copy } from 'lucide-react';
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

// Define schema for a zap
const zapSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  isActive: z.boolean().default(false),
  triggerApp: z.string().optional(),
  actionApp: z.string().optional(),
  webhookUrl: z.string().optional(),
  schedule: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

type ZapTag = {
  id: string;
  name: string;
  color: string;
};

type ZapApp = {
  id: string;
  name: string;
  icon: string;
};

// Extended Zap type with more fields
type Zap = z.infer<typeof zapSchema> & {
  id: string;
  createdAt: Date;
  lastRun?: Date;
  runCount?: number;
  triggerApp?: ZapApp;
  actionApp?: ZapApp;
  tags?: string[];
  status?: 'success' | 'error' | 'warning' | null;
};

// Popular app integrations
const popularApps: ZapApp[] = [
  { id: "1", name: "Gmail", icon: "📧" },
  { id: "2", name: "Slack", icon: "💬" },
  { id: "3", name: "Notion", icon: "📝" },
  { id: "4", name: "Google Calendar", icon: "📅" },
  { id: "5", name: "Twitter", icon: "🐦" },
  { id: "6", name: "Trello", icon: "📋" },
  { id: "7", name: "Discord", icon: "🎮" },
  { id: "8", name: "Dropbox", icon: "📦" },
  { id: "9", name: "Salesforce", icon: "☁️" },
  { id: "10", name: "HubSpot", icon: "📊" },
];

// Define tags for zaps
const zapTags: ZapTag[] = [
  { id: "1", name: "Marketing", color: "bg-pink-100 text-pink-800" },
  { id: "2", name: "Sales", color: "bg-blue-100 text-blue-800" },
  { id: "3", name: "Support", color: "bg-purple-100 text-purple-800" },
  { id: "4", name: "Finance", color: "bg-yellow-100 text-yellow-800" },
  { id: "5", name: "Personal", color: "bg-green-100 text-green-800" },
];

const Dashboard: React.FC = () => {
  const [zaps, setZaps] = useState<Zap[]>([
    {
      id: "1",
      name: "Email to Slack Notification",
      description: "Sends a Slack notification when a new email arrives",
      isActive: true,
      createdAt: new Date("2025-03-05"),
      lastRun: new Date("2025-04-08"),
      runCount: 152,
      triggerApp: popularApps[0], // Gmail
      actionApp: popularApps[1], // Slack
      tags: ["1", "3"], // Marketing, Support
      status: 'success'
    },
    {
      id: "2",
      name: "Twitter Mentions to Discord",
      description: "Posts Twitter mentions to a Discord channel",
      isActive: false,
      createdAt: new Date("2025-03-10"),
      lastRun: new Date("2025-04-07"),
      runCount: 73,
      triggerApp: popularApps[4], // Twitter
      actionApp: popularApps[6], // Discord
      tags: ["1"], // Marketing
      status: 'warning'
    },
    {
      id: "3",
      name: "Google Calendar to Notion",
      description: "Syncs Google Calendar events to Notion database",
      isActive: true,
      createdAt: new Date("2025-03-15"),
      lastRun: new Date("2025-04-09"),
      runCount: 98,
      triggerApp: popularApps[3], // Google Calendar
      actionApp: popularApps[2], // Notion
      tags: ["5"], // Personal
      status: 'success'
    },
    {
      id: "4",
      name: "Salesforce Leads to HubSpot",
      description: "Syncs new Salesforce leads to HubSpot CRM",
      isActive: true,
      createdAt: new Date("2025-03-20"),
      lastRun: new Date("2025-04-08"),
      runCount: 45,
      triggerApp: popularApps[8], // Salesforce
      actionApp: popularApps[9], // HubSpot
      tags: ["2"], // Sales
      status: 'error'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isRunZapOpen, setIsRunZapOpen] = useState(false);
  const [selectedZap, setSelectedZap] = useState<Zap | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [activeFilter, setActiveFilter] = useState<boolean | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  // Filter zaps based on filters
  const filteredZaps = zaps.filter(zap => {
    // Search filter
    const matchesSearch = 
      zap.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (zap.description && zap.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Active status filter
    const matchesActiveState = activeFilter === null || zap.isActive === activeFilter;
    
    // Tag filter
    const matchesTag = selectedTag === null || (zap.tags && zap.tags.includes(selectedTag));
    
    return matchesSearch && matchesActiveState && matchesTag;
  });

  const form = useForm<z.infer<typeof zapSchema>>({
    resolver: zodResolver(zapSchema),
    defaultValues: {
      name: "",
      description: "",
      isActive: false,
      triggerApp: "",
      actionApp: "",
      webhookUrl: "",
      schedule: "",
      tags: []
    }
  });

  const editForm = useForm<z.infer<typeof zapSchema>>({
    resolver: zodResolver(zapSchema),
    defaultValues: {
      name: selectedZap?.name || "",
      description: selectedZap?.description || "",
      isActive: selectedZap?.isActive || false,
      triggerApp: selectedZap?.triggerApp?.id || "",
      actionApp: selectedZap?.actionApp?.id || "",
      webhookUrl: selectedZap?.webhookUrl || "",
      schedule: selectedZap?.schedule || "",
      tags: selectedZap?.tags || []
    }
  });

  // Reset form when the create dialog opens
  React.useEffect(() => {
    if (isCreateOpen) {
      form.reset({
        name: "",
        description: "",
        isActive: false,
        triggerApp: "",
        actionApp: "",
        webhookUrl: "",
        schedule: "",
        tags: []
      });
    }
  }, [isCreateOpen, form]);

  // Update edit form when selected zap changes
  React.useEffect(() => {
    if (selectedZap && isEditOpen) {
      editForm.reset({
        name: selectedZap.name,
        description: selectedZap.description || "",
        isActive: selectedZap.isActive,
        triggerApp: selectedZap.triggerApp?.id || "",
        actionApp: selectedZap.actionApp?.id || "",
        webhookUrl: selectedZap.webhookUrl || "",
        schedule: selectedZap.schedule || "",
        tags: selectedZap.tags || []
      });
    }
  }, [selectedZap, isEditOpen, editForm]);

  const handleCreate = (data: z.infer<typeof zapSchema>) => {
    const triggerAppObj = data.triggerApp ? popularApps.find(app => app.id === data.triggerApp) : undefined;
    const actionAppObj = data.actionApp ? popularApps.find(app => app.id === data.actionApp) : undefined;

    const newZap: Zap = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description || "",
      isActive: data.isActive,
      createdAt: new Date(),
      lastRun: undefined,
      runCount: 0,
      triggerApp: triggerAppObj,
      actionApp: actionAppObj,
      tags: data.tags || [],
      webhookUrl: data.webhookUrl,
      schedule: data.schedule,
      status: null
    };
    
    setZaps([...zaps, newZap]);
    setIsCreateOpen(false);
    toast.success("Zap created successfully!");
  };

  const handleUpdate = (data: z.infer<typeof zapSchema>) => {
    if (!selectedZap) return;
    
    const triggerAppObj = data.triggerApp ? popularApps.find(app => app.id === data.triggerApp) : undefined;
    const actionAppObj = data.actionApp ? popularApps.find(app => app.id === data.actionApp) : undefined;
    
    const updatedZaps = zaps.map(zap => 
      zap.id === selectedZap.id 
        ? {
            ...zap,
            name: data.name,
            description: data.description || "",
            isActive: data.isActive,
            triggerApp: triggerAppObj,
            actionApp: actionAppObj,
            tags: data.tags || [],
            webhookUrl: data.webhookUrl,
            schedule: data.schedule,
          }
        : zap
    );
    
    setZaps(updatedZaps);
    setIsEditOpen(false);
    toast.success("Zap updated successfully!");
  };

  const handleDelete = () => {
    if (!selectedZap) return;
    
    const updatedZaps = zaps.filter(zap => zap.id !== selectedZap.id);
    setZaps(updatedZaps);
    setIsDeleteOpen(false);
    toast.success("Zap deleted successfully!");
  };
  
  const handleDuplicate = (zap: Zap) => {
    const newZap = {
      ...zap,
      id: Date.now().toString(),
      name: `${zap.name} (Copy)`,
      createdAt: new Date(),
      lastRun: undefined,
      runCount: 0,
      status: null
    };
    
    setZaps([...zaps, newZap]);
    toast.success(`Duplicated "${zap.name}"`);
  };
  
  const handleToggleActive = (zap: Zap) => {
    const updatedZaps = zaps.map(z => 
      z.id === zap.id ? { ...z, isActive: !z.isActive } : z
    );
    
    setZaps(updatedZaps);
    toast.success(`${zap.name} ${!zap.isActive ? 'activated' : 'deactivated'}`);
  };

  const handleRunZap = () => {
    if (!selectedZap) return;

    setIsRunning(true);
    
    setTimeout(() => {
      // Update the zap with a new run
      const updatedZaps = zaps.map(zap => 
        zap.id === selectedZap.id 
          ? {
              ...zap,
              lastRun: new Date(),
              runCount: (zap.runCount || 0) + 1,
              status: 'success'
            }
          : zap
      );
      
      setZaps(updatedZaps);
      setIsRunning(false);
      setIsRunZapOpen(false);
      toast.success(`"${selectedZap.name}" ran successfully`);
    }, 2000);
  };

  const handleWebhookRun = () => {
    if (!selectedZap) return;
    if (!webhookUrl) {
      toast.error("Please enter a webhook URL");
      return;
    }

    setIsRunning(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update the zap with a new run
      const updatedZaps = zaps.map(zap => 
        zap.id === selectedZap.id 
          ? {
              ...zap,
              lastRun: new Date(),
              runCount: (zap.runCount || 0) + 1,
              webhookUrl: webhookUrl,
              status: 'success'
            }
          : zap
      );
      
      setZaps(updatedZaps);
      setIsRunning(false);
      setIsRunZapOpen(false);
      toast.success(`Webhook triggered successfully for "${selectedZap.name}"`);
    }, 2000);
  };

  const formatDate = (date?: Date) => {
    if (!date) return "Never";
    
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    }).format(date);
  };
  
  const getTagColor = (tagId?: string) => {
    if (!tagId) return "bg-gray-100 text-gray-800";
    const tag = zapTags.find(tag => tag.id === tagId);
    return tag ? tag.color : "bg-gray-100 text-gray-800";
  };
  
  const getTagName = (tagId?: string) => {
    if (!tagId) return "";
    const tag = zapTags.find(tag => tag.id === tagId);
    return tag ? tag.name : "";
  };
  
  const getStatusColor = (status?: 'success' | 'error' | 'warning' | null) => {
    switch (status) {
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      default:
        return 'text-gray-400';
    }
  };
  
  const renderForm = (formToUse: typeof form, onSubmit: (data: z.infer<typeof zapSchema>) => void) => {
    return (
      <Form {...formToUse}>
        <form onSubmit={formToUse.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={formToUse.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="My amazing zap" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={formToUse.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="What does this zap do?" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={formToUse.control}
              name="triggerApp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trigger App</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="">Select Trigger App</option>
                      {popularApps.map((app) => (
                        <option key={app.id} value={app.id}>
                          {app.icon} {app.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={formToUse.control}
              name="actionApp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Action App</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="">Select Action App</option>
                      {popularApps.map((app) => (
                        <option key={app.id} value={app.id}>
                          {app.icon} {app.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={formToUse.control}
            name="webhookUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Webhook URL (Optional)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://hooks.zapier.com/..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formToUse.control}
            name="schedule"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Schedule (Optional)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Every day at 9:00 AM" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formToUse.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <div className="flex flex-wrap gap-2">
                  {zapTags.map((tag) => (
                    <div key={tag.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`tag-${tag.id}`} 
                        checked={field.value?.includes(tag.id)}
                        onCheckedChange={(checked) => {
                          const updatedTags = checked
                            ? [...(field.value || []), tag.id]
                            : (field.value || []).filter(id => id !== tag.id);
                          field.onChange(updatedTags);
                        }}
                      />
                      <label
                        htmlFor={`tag-${tag.id}`}
                        className={`text-sm px-2 py-1 rounded-full ${tag.color.split(' ')[0]} ${tag.color.split(' ')[1]}`}
                      >
                        {tag.name}
                      </label>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={formToUse.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Active
                  </FormLabel>
                  <p className="text-sm text-muted-foreground">
                    This zap will run automatically when activated.
                  </p>
                </div>
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full">Save</Button>
        </form>
      </Form>
    );
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-7xl">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <h1 className="text-2xl font-bold">My Zaps</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search zaps..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full"
              />
            </div>
            
            <div className="flex space-x-2">
              <NavigationMenu className="max-w-none">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Filter</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[200px] p-2">
                        <div className="mb-2">
                          <h3 className="font-medium mb-1">Status</h3>
                          <div className="space-y-1">
                            <button 
                              className={`w-full text-left px-2 py-1 text-sm rounded-md ${activeFilter === null ? 'bg-accent text-accent-foreground' : ''}`}
                              onClick={() => setActiveFilter(null)}
                            >
                              All
                            </button>
                            <button 
                              className={`w-full text-left px-2 py-1 text-sm rounded-md ${activeFilter === true ? 'bg-accent text-accent-foreground' : ''}`}
                              onClick={() => setActiveFilter(true)}
                            >
                              Active
                            </button>
                            <button 
                              className={`w-full text-left px-2 py-1 text-sm rounded-md ${activeFilter === false ? 'bg-accent text-accent-foreground' : ''}`}
                              onClick={() => setActiveFilter(false)}
                            >
                              Inactive
                            </button>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Tags</h3>
                          <div className="space-y-1">
                            <button
                              className={`w-full text-left px-2 py-1 text-sm rounded-md ${selectedTag === null ? 'bg-accent text-accent-foreground' : ''}`}
                              onClick={() => setSelectedTag(null)}
                            >
                              All Tags
                            </button>
                            {zapTags.map(tag => (
                              <button
                                key={tag.id}
                                className={`w-full text-left px-2 py-1 text-sm rounded-md flex items-center ${selectedTag === tag.id ? 'bg-accent text-accent-foreground' : ''}`}
                                onClick={() => setSelectedTag(tag.id)}
                              >
                                <span className={`w-2 h-2 rounded-full mr-2 ${tag.color.split(' ')[0]}`}></span>
                                {tag.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              <div className="flex border rounded-md">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={`rounded-r-none ${viewMode === 'list' ? 'bg-accent' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list">
                    <line x1="8" x2="21" y1="6" y2="6"/>
                    <line x1="8" x2="21" y1="12" y2="12"/>
                    <line x1="8" x2="21" y1="18" y2="18"/>
                    <line x1="3" x2="3.01" y1="6" y2="6"/>
                    <line x1="3" x2="3.01" y1="12" y2="12"/>
                    <line x1="3" x2="3.01" y1="18" y2="18"/>
                  </svg>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={`rounded-l-none ${viewMode === 'grid' ? 'bg-accent' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grid">
                    <rect width="7" height="7" x="3" y="3" rx="1"/>
                    <rect width="7" height="7" x="14" y="3" rx="1"/>
                    <rect width="7" height="7" x="14" y="14" rx="1"/>
                    <rect width="7" height="7" x="3" y="14" rx="1"/>
                  </svg>
                </Button>
              </div>
              
              <Button onClick={() => setIsCreateOpen(true)} className="bg-intelibridge-blue hover:bg-intelibridge-blue/90">
                <Plus className="mr-2 h-4 w-4" /> Create Zap
              </Button>
            </div>
          </div>
        </div>

        {filteredZaps.length > 0 ? (
          viewMode === 'list' ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden lg:table-cell">Trigger → Action</TableHead>
                    <TableHead className="hidden md:table-cell">Tags</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Last Run</TableHead>
                    <TableHead className="hidden md:table-cell">Runs</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredZaps.map((zap) => (
                    <TableRow key={zap.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <span className={`mr-2 text-lg ${getStatusColor(zap.status)}`}>•</span>
                          {zap.name}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {zap.triggerApp && zap.actionApp ? (
                          <div className="flex items-center text-sm">
                            <span className="mr-1">{zap.triggerApp.icon}</span> {zap.triggerApp.name} 
                            <ArrowRight className="mx-2 h-3 w-3" />
                            <span className="mr-1">{zap.actionApp.icon}</span> {zap.actionApp.name}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">Not configured</span>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {zap.tags && zap.tags.map(tagId => (
                            <span 
                              key={tagId} 
                              className={`inline-flex text-xs px-2 py-0.5 rounded-full ${getTagColor(tagId)}`}
                            >
                              {getTagName(tagId)}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${zap.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {zap.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">
                        {zap.lastRun ? formatDate(zap.lastRun) : 'Never'}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {zap.runCount || 0}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedZap(zap);
                              setIsRunZapOpen(true);
                            }}
                            className="text-green-600"
                          >
                            <Play className="h-4 w-4" />
                            <span className="sr-only">Run</span>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[160px]">
                              <DropdownMenuItem onClick={() => {
                                setSelectedZap(zap);
                                setIsViewOpen(true);
                              }}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setSelectedZap(zap);
                                setIsEditOpen(true);
                              }}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDuplicate(zap)}>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleActive(zap)}>
                                {zap.isActive ? (
                                  <>
                                    <Pause className="mr-2 h-4 w-4" />
                                    Deactivate
                                  </>
                                ) : (
                                  <>
                                    <Play className="mr-2 h-4 w-4" />
                                    Activate
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => {
                                  setSelectedZap(zap);
                                  setIsDeleteOpen(true);
                                }}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredZaps.map((zap) => (
                <Card key={zap.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center">
                          <span className={`mr-2 text-lg ${getStatusColor(zap.status)}`}>•</span>
                          {zap.name}
                        </CardTitle>
                        <CardDescription className="mt-1 line-clamp-2">
                          {zap.description || "No description provided."}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuItem onClick={() => {
                            setSelectedZap(zap);
                            setIsViewOpen(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedZap(zap);
                            setIsEditOpen(true);
                          }}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(zap)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleActive(zap)}>
                            {zap.isActive ? (
                              <>
                                <Pause className="mr-2 h-4 w-4" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <Play className="mr-2 h-4 w-4" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => {
                              setSelectedZap(zap);
                              setIsDeleteOpen(true);
                            }}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="text-sm space-y-2">
                      {zap.triggerApp && zap.actionApp && (
                        <div className="flex items-center bg-muted p-2 rounded-md">
                          <div className="flex items-center flex-1">
                            <span className="mr-1 text-lg">{zap.triggerApp.icon}</span> 
                            <span className="font-medium text-xs">{zap.triggerApp.name}</span>
                          </div>
                          <ArrowRight className="mx-2 h-3 w-3" />
                          <div className="flex items-center flex-1">
                            <span className="mr-1 text-lg">{zap.actionApp.icon}</span> 
                            <span className="font-medium text-xs">{zap.actionApp.name}</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-1">
                        {zap.tags && zap.tags.map(tagId => (
                          <span 
                            key={tagId} 
                            className={`inline-flex text-xs px-2 py-0.5 rounded-full ${getTagColor(tagId)}`}
                          >
                            {getTagName(tagId)}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <div>Last run: {zap.lastRun ? formatDate(zap.lastRun) : 'Never'}</div>
                        <div>Runs: {zap.runCount || 0}</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-3 flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={`${zap.isActive ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-800 border-gray-200'}`}
                      onClick={() => handleToggleActive(zap)}
                    >
                      {zap.isActive ? 'Active' : 'Inactive'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 border-green-200"
                      onClick={() => {
                        setSelectedZap(zap);
                        setIsRunZapOpen(true);
                      }}
                    >
                      <Play className="mr-2 h-3 w-3" />
                      Run Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <Zap className="h-8 w-8 text-muted-foreground" />
            <h3 className="mt-2 text-lg font-semibold">No zaps found</h3>
            <p className="mb-4 mt-1 text-sm text-muted-foreground">
              {searchTerm || activeFilter !== null || selectedTag !== null 
                ? "No zaps match your filters."
                : "Get started by creating a new zap."}
            </p>
            {!searchTerm && activeFilter === null && selectedTag === null && (
              <Button onClick={() => setIsCreateOpen(true)} className="bg-intelibridge-blue hover:bg-intelibridge-blue/90">
                <Plus className="mr-2 h-4 w-4" /> Create Zap
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Create Zap Dialog/Drawer */}
      {isMobile ? (
        <Drawer open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Create Zap</DrawerTitle>
              <DrawerDescription>Create a new automation zap to connect your services.</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 pb-4">
              {renderForm(form, handleCreate)}
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Zap</DialogTitle>
              <DialogDescription>Create a new automation zap to connect your services.</DialogDescription>
            </DialogHeader>
            {renderForm(form, handleCreate)}
          </DialogContent>
        </Dialog>
      )}

      {/* View Zap Dialog */}
      {selectedZap && (
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <span className={`mr-2 text-lg ${getStatusColor(selectedZap.status)}`}>•</span>
                {selectedZap.name}
              </DialogTitle>
              <DialogDescription>
                Created on {formatDate(selectedZap.createdAt)}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium">Description</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedZap.description || "No description provided."}
                </p>
              </div>
              
              {selectedZap.triggerApp && selectedZap.actionApp && (
                <div>
                  <h4 className="text-sm font-medium">Integration</h4>
                  <div className="mt-1 flex items-center bg-muted p-2 rounded-md">
                    <div className="flex items-center">
                      <span className="mr-1 text-lg">{selectedZap.triggerApp.icon}</span> 
                      <span className="font-medium">{selectedZap.triggerApp.name}</span>
                    </div>
                    <ArrowRight className="mx-2 h-4 w-4" />
                    <div className="flex items-center">
                      <span className="mr-1 text-lg">{selectedZap.actionApp.icon}</span> 
                      <span className="font-medium">{selectedZap.actionApp.name}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedZap.webhookUrl && (
                <div>
                  <h4 className="text-sm font-medium">Webhook URL</h4>
                  <p className="text-sm font-mono bg-muted p-2 rounded-md mt-1 break-all">
                    {selectedZap.webhookUrl}
                  </p>
                </div>
              )}
              
              {selectedZap.schedule && (
                <div>
                  <h4 className="text-sm font-medium">Schedule</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedZap.schedule}
                  </p>
                </div>
              )}
              
              {selectedZap.tags && selectedZap.tags.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium">Tags</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedZap.tags.map(tagId => (
                      <span 
                        key={tagId} 
                        className={`inline-flex text-xs px-2 py-0.5 rounded-full ${getTagColor(tagId)}`}
                      >
                        {getTagName(tagId)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h4 className="text-sm font-medium">Status</h4>
                <div className="mt-1">
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${selectedZap.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {selectedZap.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Last Run</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedZap.lastRun ? formatDate(selectedZap.lastRun) : 'Never'}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Run Count</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedZap.runCount || 0} runs
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewOpen(false)}>Close</Button>
              <Button onClick={() => {
                setIsViewOpen(false);
                setIsRunZapOpen(true);
              }} className="bg-intelibridge-blue hover:bg-intelibridge-blue/90">
                <Play className="mr-2 h-4 w-4" /> Run Now
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Zap Dialog/Drawer */}
      {selectedZap && (
        <>
          {isMobile ? (
            <Drawer open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Edit Zap</DrawerTitle>
                  <DrawerDescription>Update your automation zap.</DrawerDescription>
                </DrawerHeader>
                <div className="px-4 pb-4">
                  {renderForm(editForm, handleUpdate)}
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ) : (
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Edit Zap</DialogTitle>
                  <DialogDescription>Update your automation zap.</DialogDescription>
                </DialogHeader>
                {renderForm(editForm, handleUpdate)}
              </DialogContent>
            </Dialog>
          )}
        </>
      )}

      {/* Delete Confirmation Dialog */}
      {selectedZap && (
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Zap</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{selectedZap.name}"?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleDelete}>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Run Zap Dialog */}
      {selectedZap && (
        <Dialog open={isRunZapOpen} onOpenChange={setIsRunZapOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Run Zap</DialogTitle>
              <DialogDescription>
                Run "{selectedZap.name}" manually
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL (Optional)</Label>
                <Input 
                  id="webhook-url" 
                  placeholder="Enter a webhook URL to trigger" 
                  value={webhookUrl} 
                  onChange={(e) => setWebhookUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  If provided, this will trigger the webhook URL instead of running the zap directly.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRunZapOpen(false)}>Cancel</Button>
              <Button 
                onClick={webhookUrl ? handleWebhookRun : handleRunZap} 
                disabled={isRunning}
                className="bg-intelibridge-blue hover:bg-intelibridge-blue/90"
              >
                {isRunning ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Run Now
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

// Define FormDescription component
function FormDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-muted-foreground">
      {children}
    </p>
  );
}

export default Dashboard;
