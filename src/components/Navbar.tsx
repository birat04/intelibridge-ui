
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, Home } from 'lucide-react';

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
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-intelibridge-blue text-2xl font-bold">Inteli<span className="text-intelibridge-light-blue">Bridge</span></div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium hover:text-intelibridge-light-blue transition-colors flex items-center gap-1">
            <Home className="h-4 w-4" /> Home
          </Link>
          <Link to="#features" className="text-sm font-medium hover:text-intelibridge-light-blue transition-colors">Features</Link>
          <Link to="#workflow" className="text-sm font-medium hover:text-intelibridge-light-blue transition-colors">Workflow</Link>
          <Link to="#pricing" className="text-sm font-medium hover:text-intelibridge-light-blue transition-colors">Pricing</Link>
          <Link to="#about" className="text-sm font-medium hover:text-intelibridge-light-blue transition-colors">About</Link>
          <Link to="/dashboard" className="text-sm font-medium hover:text-intelibridge-light-blue transition-colors">Dashboard</Link>
          <Link to="/signin">
            <Button variant="outline" size="sm" className="mr-2">
              <LogIn className="mr-2 h-4 w-4" /> Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="bg-intelibridge-blue hover:bg-intelibridge-blue/90">
              Sign Up
            </Button>
          </Link>
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
            <Link 
              to="/"
              className="block text-sm font-medium hover:text-intelibridge-light-blue transition-colors flex items-center gap-1"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-4 w-4" /> Home
            </Link>
            <Link 
              to="#features" 
              className="block text-sm font-medium hover:text-intelibridge-light-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="#workflow" 
              className="block text-sm font-medium hover:text-intelibridge-light-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Workflow
            </Link>
            <Link 
              to="#pricing" 
              className="block text-sm font-medium hover:text-intelibridge-light-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="#about" 
              className="block text-sm font-medium hover:text-intelibridge-light-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/dashboard" 
              className="block text-sm font-medium hover:text-intelibridge-light-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="w-full mb-2">
                <LogIn className="mr-2 h-4 w-4" /> Sign In
              </Button>
            </Link>
            <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-intelibridge-blue hover:bg-intelibridge-blue/90">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
