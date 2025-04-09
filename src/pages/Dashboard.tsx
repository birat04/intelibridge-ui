
import React, { useState } from 'react';
import { PlusCircle, Search, Edit2, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';

// This is a mock data structure for zaps - replace with real data when available
type Zap = {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  lastRun: string;
  createdAt: string;
};

const mockZaps: Zap[] = [
  {
    id: '1',
    name: 'Email to Slack',
    description: 'Send new emails to Slack',
    status: 'active',
    lastRun: '2025-04-09T10:30:00Z',
    createdAt: '2025-03-15T08:45:00Z',
  },
  {
    id: '2',
    name: 'Google Sheet Update',
    description: 'Update spreadsheet when form is submitted',
    status: 'inactive',
    lastRun: '2025-04-07T14:15:00Z',
    createdAt: '2025-03-20T11:20:00Z',
  },
  {
    id: '3',
    name: 'Customer Follow-up',
    description: 'Send follow-up email after purchase',
    status: 'draft',
    lastRun: '',
    createdAt: '2025-04-05T09:10:00Z',
  },
];

const Dashboard: React.FC = () => {
  const [zaps, setZaps] = useState<Zap[]>(mockZaps);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZap, setSelectedZap] = useState<Zap | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const { toast } = useToast();

  // Filter zaps based on search query
  const filteredZaps = zaps.filter(zap => 
    zap.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    zap.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setZaps(zaps.filter(zap => zap.id !== id));
    setIsDeleteDialogOpen(false);
    toast({
      title: "Zap deleted",
      description: "The zap has been deleted successfully.",
    });
  };

  const handleEdit = (zap: Zap) => {
    setSelectedZap(zap);
    setIsFormDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedZap(null);
    setIsFormDialogOpen(true);
  };

  const handleSaveZap = (zapData: Partial<Zap>) => {
    if (selectedZap) {
      // Update existing zap
      setZaps(zaps.map(zap => 
        zap.id === selectedZap.id ? { ...zap, ...zapData } : zap
      ));
      toast({
        title: "Zap updated",
        description: "The zap has been updated successfully.",
      });
    } else {
      // Create new zap
      const newZap: Zap = {
        id: Date.now().toString(),
        name: zapData.name || 'Untitled Zap',
        description: zapData.description || '',
        status: 'draft',
        lastRun: '',
        createdAt: new Date().toISOString(),
      };
      setZaps([...zaps, newZap]);
      toast({
        title: "Zap created",
        description: "A new zap has been created successfully.",
      });
    }
    setIsFormDialogOpen(false);
  };

  // Helper to format dates
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: Zap['status'] }) => {
    const variants = {
      active: "bg-green-500 hover:bg-green-600",
      inactive: "bg-yellow-500 hover:bg-yellow-600",
      draft: "bg-gray-500 hover:bg-gray-600"
    };

    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 container max-w-7xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Zaps Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your automation workflows</p>
          </div>
          <Button onClick={handleCreate} className="mt-4 md:mt-0">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Zap
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Zaps</CardTitle>
            <CardDescription>View and manage all your automation workflows</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search zaps..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredZaps.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        {searchQuery ? 'No matching zaps found' : 'No zaps created yet'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredZaps.map((zap) => (
                      <TableRow key={zap.id}>
                        <TableCell className="font-medium">{zap.name}</TableCell>
                        <TableCell>{zap.description}</TableCell>
                        <TableCell><StatusBadge status={zap.status} /></TableCell>
                        <TableCell>{formatDate(zap.lastRun)}</TableCell>
                        <TableCell>{formatDate(zap.createdAt)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(zap)}>
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => {
                                setSelectedZap(zap);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{selectedZap?.name}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
              <Button 
                variant="destructive" 
                onClick={() => selectedZap && handleDelete(selectedZap.id)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create/Edit Form Dialog */}
        <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedZap ? 'Edit Zap' : 'Create New Zap'}</DialogTitle>
            </DialogHeader>
            <ZapForm 
              initialData={selectedZap || undefined} 
              onSubmit={handleSaveZap} 
              onCancel={() => setIsFormDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

type ZapFormProps = {
  initialData?: Partial<Zap>;
  onSubmit: (data: Partial<Zap>) => void;
  onCancel: () => void;
};

const ZapForm: React.FC<ZapFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [status, setStatus] = useState<Zap['status']>(initialData?.status || 'draft');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, status });
  };

  return (
    <Form>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          name="name"
          render={() => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter zap name"
                  required
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="description"
          render={() => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter zap description"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? 'Update' : 'Create'} Zap
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Dashboard;
