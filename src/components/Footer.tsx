
import React from 'react';
import { Facebook, Twitter, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-intelibridge-gray-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Features</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Templates</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Integrations</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Status</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Documentation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">API Reference</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Tutorials</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Press</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Partners</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">GDPR</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between pt-8 border-t border-gray-700">
          <div className="mb-4 md:mb-0">
            <div className="text-xl font-bold mb-2">Inteli<span className="text-intelibridge-light-blue">Bridge</span></div>
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} InteliBridge. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-4 items-center">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
