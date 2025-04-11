
import React from 'react';
import BackButton from "@/components/BackButton";

const AgentsBuilder: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <BackButton to="/dashboard" className="mb-6" />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Agents Builder</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="mb-4">This is where users will be able to create AI agents.</p>
          <p className="text-gray-500">Coming soon...</p>
        </div>
      </div>
    </div>
  );
}

export default AgentsBuilder;
