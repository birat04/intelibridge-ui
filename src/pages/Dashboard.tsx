
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
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/use-mobile";

// Define the schema for a zap
const zapSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  isActive: z.boolean().default(false),
});

type Zap = z.infer<typeof zapSchema> & {
  id: string;
  createdAt: Date;
};

const Dashboard: React.FC = () => {
  const [zaps, setZaps] = useState<Zap[]>([
    {
      id: "1",
      name: "Email to Slack Notification",
      description: "Sends a Slack notification when a new email arrives",
      isActive: true,
      createdAt: new Date("2025-03-05")
    },
    {
      id: "2",
      name: "Twitter Mentions to Discord",
      description: "Posts Twitter mentions to a Discord channel",
      isActive: false,
      createdAt: new Date("2025-03-10")
    },
    {
      id: "3",
      name: "Google Calendar to Notion",
      description: "Syncs Google Calendar events to Notion database",
      isActive: true,
      createdAt: new Date("2025-03-15")
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedZap, setSelectedZap] = useState<Zap | null>(null);
  
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  // Filter zaps based on search term
  const filteredZaps = zaps.filter(zap => 
    zap.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (zap.description && zap.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const form = useForm<z.infer<typeof zapSchema>>({
    resolver: zodResolver(zapSchema),
    defaultValues: {
      name: "",
      description: "",
      isActive: false
    }
  });

  const editForm = useForm<z.infer<typeof zapSchema>>({
    resolver: zodResolver(zapSchema),
    defaultValues: {
      name: selectedZap?.name || "",
      description: selectedZap?.description || "",
      isActive: selectedZap?.isActive || false
    }
  });

  // Reset form when the create dialog opens
  React.useEffect(() => {
    if (isCreateOpen) {
      form.reset({
        name: "",
        description: "",
        isActive: false
      });
    }
  }, [isCreateOpen, form]);

  // Update edit form when selected zap changes
  React.useEffect(() => {
    if (selectedZap && isEditOpen) {
      editForm.reset({
        name: selectedZap.name,
        description: selectedZap.description || "",
        isActive: selectedZap.isActive
      });
    }
  }, [selectedZap, isEditOpen, editForm]);

  const handleCreate = (data: z.infer<typeof zapSchema>) => {
    const newZap: Zap = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description || "",
      isActive: data.isActive,
      createdAt: new Date()
    };
    
    setZaps([...zaps, newZap]);
    setIsCreateOpen(false);
    toast.success("Zap created successfully!");
  };

  const handleUpdate = (data: z.infer<typeof zapSchema>) => {
    if (!selectedZap) return;
    
    const updatedZaps = zaps.map(zap => 
      zap.id === selectedZap.id ? { ...zap, ...data } : zap
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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    }).format(date);
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
                  <Input {...field} />
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
                  <Textarea {...field} />
                </FormControl>
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
                  <FormDescription>
                    This zap will run automatically when activated.
                  </FormDescription>
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
          <div className="flex w-full sm:w-auto space-x-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search zaps..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button onClick={() => setIsCreateOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Create Zap
            </Button>
          </div>
        </div>

        {filteredZaps.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredZaps.map((zap) => (
                  <TableRow key={zap.id}>
                    <TableCell className="font-medium">{zap.name}</TableCell>
                    <TableCell className="hidden md:table-cell max-w-xs truncate">{zap.description}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${zap.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {zap.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{formatDate(zap.createdAt)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedZap(zap);
                            setIsViewOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedZap(zap);
                            setIsEditOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedZap(zap);
                            setIsDeleteOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <h3 className="mt-2 text-lg font-semibold">No zaps found</h3>
            <p className="mb-4 mt-1 text-sm text-muted-foreground">
              {searchTerm ? "No zaps match your search." : "Get started by creating a new zap."}
            </p>
            {!searchTerm && (
              <Button onClick={() => setIsCreateOpen(true)}>
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
            <div className="px-4">
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Zap</DialogTitle>
              <DialogDescription>Create a new automation zap to connect your services.</DialogDescription>
            </DialogHeader>
            {renderForm(form, handleCreate)}
          </DialogContent>
        </Dialog>
      )}

      {/* View Zap Dialog/Drawer */}
      {selectedZap && (
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedZap.name}</DialogTitle>
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
              <div>
                <h4 className="text-sm font-medium">Status</h4>
                <div className="mt-1">
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${selectedZap.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {selectedZap.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewOpen(false)}>Close</Button>
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
                <div className="px-4">
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
              <DialogContent>
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
    </div>
  );
};

// Properly define FormDescription component
function FormDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.8rem] text-muted-foreground">
      {children}
    </p>
  );
}

export default Dashboard;
