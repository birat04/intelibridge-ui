
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import WorkflowBuilder from "./pages/WorkflowBuilder";
import TablesBuilder from "./pages/TablesBuilder";
import InterfaceBuilder from "./pages/InterfaceBuilder";
import ChatbotBuilder from "./pages/ChatbotBuilder";
import CanvasBuilder from "./pages/CanvasBuilder";
import AgentsBuilder from "./pages/AgentsBuilder";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/workflow-builder" element={<WorkflowBuilder />} />
          <Route path="/tables-builder" element={<TablesBuilder />} />
          <Route path="/interface-builder" element={<InterfaceBuilder />} />
          <Route path="/chatbot-builder" element={<ChatbotBuilder />} />
          <Route path="/canvas-builder" element={<CanvasBuilder />} />
          <Route path="/agents-builder" element={<AgentsBuilder />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
