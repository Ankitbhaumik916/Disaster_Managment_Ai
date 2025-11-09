import React, { useState } from 'react';
import { AlertTriangle, MapPin, Bell, Users, TrendingUp, Settings, Home, MessageSquare } from 'lucide-react';

const DisasterRiskPlatform = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  // TODO: Implement disaster detail view when a disaster is selected
  const [selectedDisaster, setSelectedDisaster] = useState(null);

  const disasters = [
    {
      id: 1,
      type: 'Flood Warning',
      severity: 'High',
      location: 'Coastal Region A',
      affected: '50,000+',
      time: '2 hours ago',
      risk: 85,
      message: 'Heavy rainfall expected. Evacuation advised for low-lying areas.'
    },
    {
      id: 2,
      type: 'Earthquake Alert',
      severity: 'Medium',
      location: 'Northern District',
      affected: '120,000+',
      time: '5 hours ago',
      risk: 60,
      message: 'Seismic activity detected. Stay alert and follow safety protocols.'
    },
    {
      id: 3,
      type: 'Wildfire Risk',
      severity: 'Critical',
      location: 'Forest Belt C',
      affected: '30,000+',
      time: '30 minutes ago',
      risk: 95,
      message: 'Immediate evacuation required. Fire spreading rapidly due to wind.'
    }
  ];

  const aiInsights = [
    { label: 'Risk Prediction Accuracy', value: '94.2%' },
    { label: 'Messages Delivered', value: '2.3M' },
    { label: 'Response Rate', value: '87%' },
    { label: 'Lives Protected', value: '450K+' }
  ];

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #1e1548 0%, #5B4B8A 25%, #E94E8C 75%, #FFB5C5 100%)'
    }}>
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-white text-xl font-bold">DisasterAI</h1>
              <p className="text-white/70 text-xs">Risk Communication Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition">
              <Bell className="text-white" size={20} />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition">
              <Settings className="text-white" size={20} />
            </button>
            <div className="w-8 h-8 bg-white/20 rounded-full"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation */}
        <div className="flex space-x-2 mb-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Home },
            { id: 'alerts', label: 'Active Alerts', icon: AlertTriangle },
            { id: 'messages', label: 'Messages', icon: MessageSquare },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                activeTab === tab.id
                  ? 'bg-white text-purple-900'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <tab.icon size={16} />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* AI Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {aiInsights.map((insight, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <p className="text-white/70 text-sm mb-2">{insight.label}</p>
              <p className="text-white text-3xl font-bold">{insight.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Disasters */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-lg font-bold">Active Disasters</h2>
              <span className="text-white/70 text-sm">{disasters.length} Active</span>
            </div>
            
            <div className="space-y-4">
              {disasters.map(disaster => (
                <div
                  key={disaster.id}
                  onClick={() => setSelectedDisaster(disaster)}
                  className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        disaster.severity === 'Critical' ? 'bg-red-400' :
                        disaster.severity === 'High' ? 'bg-orange-400' :
                        'bg-yellow-400'
                      }`}></div>
                      <div>
                        <h3 className="text-white font-semibold">{disaster.type}</h3>
                        <p className="text-white/60 text-sm">{disaster.time}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      disaster.severity === 'Critical' ? 'bg-red-500/20 text-red-300' :
                      disaster.severity === 'High' ? 'bg-orange-500/20 text-orange-300' :
                      'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {disaster.severity}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm mb-3">
                    <div className="flex items-center space-x-1 text-white/70">
                      <MapPin size={14} />
                      <span>{disaster.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-white/70">
                      <Users size={14} />
                      <span>{disaster.affected} affected</span>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-white/60 mb-1">
                      <span>Risk Level</span>
                      <span>{disaster.risk}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          disaster.risk > 80 ? 'bg-red-400' :
                          disaster.risk > 60 ? 'bg-orange-400' :
                          'bg-yellow-400'
                        }`}
                        style={{ width: `${disaster.risk}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <p className="text-white/80 text-sm">{disaster.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Message Generator */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h2 className="text-white text-lg font-bold mb-6">AI Message Generator</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-white/70 text-sm mb-2 block">Target Audience</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30">
                  <option>General Public</option>
                  <option>Emergency Services</option>
                  <option>Vulnerable Groups</option>
                  <option>Local Authorities</option>
                </select>
              </div>
              
              <div>
                <label className="text-white/70 text-sm mb-2 block">Language</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>Hindi</option>
                  <option>Chinese</option>
                </select>
              </div>
              
              <div>
                <label className="text-white/70 text-sm mb-2 block">Message Tone</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30">
                  <option>Urgent & Direct</option>
                  <option>Informative & Calm</option>
                  <option>Reassuring</option>
                  <option>Technical</option>
                </select>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-white/60 text-xs mb-2">AI-Generated Message:</p>
                <p className="text-white text-sm leading-relaxed">
                  "Flood warning issued for your area. Please move to higher ground immediately. Emergency shelters available at Community Center A and School District B. Bring essential documents and supplies. Stay tuned for updates."
                </p>
              </div>
              
              <button className="w-full bg-white text-purple-900 py-3 rounded-lg font-semibold hover:bg-white/90 transition">
                Generate & Send
              </button>
              
              <div className="pt-4 border-t border-white/10">
                <h3 className="text-white text-sm font-semibold mb-3">Recent Deliveries</h3>
                <div className="space-y-2">
                  {['SMS: 45,230 sent', 'Push: 32,180 sent', 'Email: 18,450 sent'].map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-white/70">{item}</span>
                      <span className="text-green-400">✓</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterRiskPlatform;