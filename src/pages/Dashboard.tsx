
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  CalendarDays, 
  Folder, 
  Search, 
  Settings, 
  Zap,
  Mail,
  Bot,
  BellRing,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import CreateMenu from '@/components/CreateMenu';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={handleGoBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 w-[200px] lg:w-[300px]"
              />
            </div>
            <CreateMenu />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid gap-8">
          {/* Quick stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
                <Zap className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-gray-500">+2.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
                <Zap className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-gray-500">+1.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                <CalendarDays className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">324</div>
                <p className="text-xs text-gray-500">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
                <CalendarDays className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">287</div>
                <p className="text-xs text-gray-500">+18% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs section */}
          <Tabs defaultValue="workflows" className="space-y-4">
            <TabsList>
              <TabsTrigger value="workflows">Workflows</TabsTrigger>
              <TabsTrigger value="tables">Tables</TabsTrigger>
              <TabsTrigger value="interfaces">Interfaces</TabsTrigger>
              <TabsTrigger value="chatbots">Chatbots</TabsTrigger>
              <TabsTrigger value="canvas">Canvas</TabsTrigger>
              <TabsTrigger value="agents">Agents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="workflows" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Recent Workflows</h2>
                <Link to="/workflow-builder">
                  <Button variant="outline">Create New Workflow</Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Workflow Cards */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Email Notifications</CardTitle>
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </div>
                    <CardDescription>Sends email when new form is submitted</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Mail className="mr-1 h-3 w-3" />
                        <span>Gmail</span>
                      </div>
                      <span>→</span>
                      <div className="flex items-center">
                        <Bot className="mr-1 h-3 w-3" />
                        <span>AI Analysis</span>
                      </div>
                      <span>→</span>
                      <div className="flex items-center">
                        <BellRing className="mr-1 h-3 w-3" />
                        <span>Notify</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-xs text-gray-500">
                      Last run: 2 hours ago
                    </div>
                    <Link to="/workflow-builder">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </Link>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Data Sync</CardTitle>
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </div>
                    <CardDescription>Sync data between CRM and database</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Mail className="mr-1 h-3 w-3" />
                        <span>CRM</span>
                      </div>
                      <span>→</span>
                      <div className="flex items-center">
                        <Bot className="mr-1 h-3 w-3" />
                        <span>Transform</span>
                      </div>
                      <span>→</span>
                      <div className="flex items-center">
                        <BellRing className="mr-1 h-3 w-3" />
                        <span>Database</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-xs text-gray-500">
                      Last run: 1 day ago
                    </div>
                    <Link to="/workflow-builder">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </Link>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Lead Generator</CardTitle>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Draft</Badge>
                    </div>
                    <CardDescription>Generates leads from website visitors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Mail className="mr-1 h-3 w-3" />
                        <span>Website</span>
                      </div>
                      <span>→</span>
                      <div className="flex items-center">
                        <Bot className="mr-1 h-3 w-3" />
                        <span>AI Filter</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-xs text-gray-500">
                      Created: 3 days ago
                    </div>
                    <Link to="/workflow-builder">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="tables" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Your Tables</h2>
                <Link to="/tables-builder">
                  <Button variant="outline">Create New Table</Button>
                </Link>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">You haven't created any tables yet.</p>
                  <div className="flex justify-center mt-4">
                    <Link to="/tables-builder">
                      <Button>Create Your First Table</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="interfaces" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Your Interfaces</h2>
                <Link to="/interface-builder">
                  <Button variant="outline">Create New Interface</Button>
                </Link>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">You haven't created any interfaces yet.</p>
                  <div className="flex justify-center mt-4">
                    <Link to="/interface-builder">
                      <Button>Create Your First Interface</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="chatbots" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Your Chatbots</h2>
                <Link to="/chatbot-builder">
                  <Button variant="outline">Create New Chatbot</Button>
                </Link>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">You haven't created any chatbots yet.</p>
                  <div className="flex justify-center mt-4">
                    <Link to="/chatbot-builder">
                      <Button>Create Your First Chatbot</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="canvas" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Your Canvases</h2>
                <Link to="/canvas-builder">
                  <Button variant="outline">Create New Canvas</Button>
                </Link>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">You haven't created any canvases yet.</p>
                  <div className="flex justify-center mt-4">
                    <Link to="/canvas-builder">
                      <Button>Create Your First Canvas</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="agents" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Your Agents</h2>
                <Link to="/agents-builder">
                  <Button variant="outline">Create New Agent</Button>
                </Link>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">You haven't created any agents yet.</p>
                  <div className="flex justify-center mt-4">
                    <Link to="/agents-builder">
                      <Button>Create Your First Agent</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
