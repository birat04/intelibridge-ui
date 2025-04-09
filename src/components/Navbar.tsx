
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <div className="text-intelibridge-blue text-2xl font-bold">Inteli<span className="text-intelibridge-light-blue">Bridge</span></div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium hover:text-intelibridge-light-blue transition-colors">Features</a>
          <a href="#workflow" className="text-sm font-medium hover:text-intelibridge-light-blue transition-colors">Workflow</a>
          <a href="#pricing" className="text-sm font-medium hover:text-intelibridge-light-blue transition-colors">Pricing</a>
          <a href="#about" className="text-sm font-medium hover:text-intelibridge-light-blue transition-colors">About</a>
          <Button size="sm" className="bg-intelibridge-blue hover:bg-intelibridge-blue/90">
            Get Started
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <a 
              href="#features" 
              className="block text-sm font-medium hover:text-intelibridge-light-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#workflow" 
              className="block text-sm font-medium hover:text-intelibridge-light-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Workflow
            </a>
            <a 
              href="#pricing" 
              className="block text-sm font-medium hover:text-intelibridge-light-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <a 
              href="#about" 
              className="block text-sm font-medium hover:text-intelibridge-light-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <Button className="w-full bg-intelibridge-blue hover:bg-intelibridge-blue/90">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
