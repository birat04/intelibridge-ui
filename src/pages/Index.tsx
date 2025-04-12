
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import WorkflowDemo from '@/components/WorkflowDemo';
import Pricing from '@/components/Pricing';
import About from '@/components/About';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4 py-8 text-center">
        <Link 
          to="/dashboard" 
          className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-lg font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Go to Dashboard
        </Link>
      </div>
      <Features />
      <WorkflowDemo />
      <Pricing />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
