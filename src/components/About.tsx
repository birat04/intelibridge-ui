
import React from 'react';
import { Users, Lightbulb, Globe, ShieldCheck } from 'lucide-react';

type ValueProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const ValueCard: React.FC<ValueProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-3 rounded-full bg-intelibridge-blue/10 text-intelibridge-blue mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About InteliBridge</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to make workflow automation intelligent, accessible, 
            and powerful for teams of all sizes.
          </p>
        </div>

        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Our Story</h3>
              <p className="mb-4">
                InteliBridge was founded in 2022 by a team of automation experts who saw the need for a 
                more intuitive, AI-powered workflow solution. After years of working with clunky, rigid 
                automation tools, we set out to build something better.
              </p>
              <p>
                Our platform combines the power of artificial intelligence with an intuitive interface,
                allowing anyone to create sophisticated workflows without writing a single line of code.
                Today, thousands of teams around the world use InteliBridge to automate their work and
                focus on what matters most.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Team collaboration" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Our Values</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard 
              icon={<Users size={24} />}
              title="People First"
              description="We believe in putting people — our customers, our team, and our community — at the center of everything we do."
            />
            <ValueCard 
              icon={<Lightbulb size={24} />}
              title="Innovation"
              description="We're constantly pushing the boundaries of what's possible in workflow automation and AI."
            />
            <ValueCard 
              icon={<Globe size={24} />}
              title="Accessibility"
              description="We're committed to making powerful technology accessible to everyone, regardless of technical skill."
            />
            <ValueCard 
              icon={<ShieldCheck size={24} />}
              title="Trust & Security"
              description="We take the security and privacy of our customers' data extremely seriously."
            />
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Join Our Team</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            We're always looking for talented individuals who share our values and mission. Check out our open positions.
          </p>
          <a 
            href="#careers" 
            className="inline-flex items-center justify-center rounded-md bg-intelibridge-blue px-8 py-3 text-lg font-medium text-white shadow transition-colors hover:bg-intelibridge-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View Open Positions
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
