import React, { useState } from 'react';
import { Eye, EyeOff, HelpCircle, Github, Linkedin, User } from 'lucide-react';
import { MessageEmbed } from './components/MessageEmbed';
import { MessageExtract } from './components/MessageExtract';
import { Help } from './components/Help';
import { CryptiPixWordmark } from './components/Logo';

type Tab = 'embed' | 'extract' | 'help';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('embed');

  const tabs = [
    { id: 'embed' as Tab, label: 'Embed Message', icon: EyeOff },
    { id: 'extract' as Tab, label: 'Extract Message', icon: Eye },
    { id: 'help' as Tab, label: 'Help', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <CryptiPixWordmark />
            <div className="text-right">
              <p className="text-sm text-gray-600">Secure • Client-Side • Open Source</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/60 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
          {activeTab === 'embed' && <MessageEmbed />}
          {activeTab === 'extract' && <MessageExtract />}
          {activeTab === 'help' && <Help />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left side - Copyright and Privacy */}
            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                © 2025 CryptiPix. Built with security and privacy in mind.
              </div>
              <div className="flex items-center space-x-6">
                <span className="text-sm text-gray-600">
                  🔒 All processing happens locally in your browser
                </span>
              </div>
            </div>

            {/* Right side - Developer Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <User className="w-4 h-4 text-indigo-600" />
                <span className="font-medium">Developed by</span>
              </div>
              
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">Himanchal Kaushale</h3>
                    <p className="text-sm text-gray-600">Full Stack Developer</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <a
                      href="https://www.linkedin.com/in/himanchal-kaushale/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    
                    <a
                      href="https://github.com/himanchalkaushale"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      title="GitHub Profile"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
