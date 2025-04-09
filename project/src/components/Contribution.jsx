import React, { useState } from 'react';
import { Star, GitFork, CircleDot, ExternalLink, Code2, Users, Clock, Globe, Terminal, Cpu, Zap, Brain, Shield, Database } from 'lucide-react';

const categoryIcons = {
  'AI': Brain,
  'Event Management': Shield,
  // 'Edge Computing': Cpu
};

const repositories = [
  {
    name: "eventura-",
    description: "Redesigned the /budget-calculator route by integrating a loader for seamless data loading and improved user experience.Migrated Tailwind CSS to modular CSS across key components to ensure better scalability and maintainability.Enhanced UI consistency through responsive layouts and refined interactive elements for a polished user interface.",
    longDescription: "Redesigned the /budget-calculator route by integrating a loader for seamless data loading and improved user experience.Migrated Tailwind CSS to modular CSS across key components to ensure better scalability and maintainability.Enhanced UI consistency through responsive layouts and refined interactive elements for a polished user interface.",
    techStack: ["Raect", "Tailwain", "Node.js", "Mongodb", "Express", "Javascript"],
    stars: 0,
    forks: 5,
    issues: 1,
    url: "https://github.com/codinggita/eventura-",
    lastUpdated: "2024-03-17",
    contributors: 3,
    languages: [
      { name: "Javascript", percentage: 45 },
      { name: "Node.js", percentage: 30 },
      { name: "Express", percentage: 25 }
    ],
    deployedUrl: "https://eventura-23.netlify.app/",
    metrics: {
      performance: 98,
      security: 95,
      maintainability: 90
    },
    category: "Event Management",
    icon: "Event Management"
  },
  {
    name: "TRAZEX11",
    description: "This is Website About Stock Market And More...",
    longDescription: "Integrated an AI-powered Chat Assistant into TRAZEX11 to enhance user support, engagement, and platform interactivity.Implemented real-time assistance for contest rules, wallet queries, and team-building guidance with 24/7 availabilityEnsured seamless integration across key sections with personalized responses and proactive error handling for improved UX.",
    techStack: ["Node.js", "Backkend", "PostMan", "React", "Javascript", "JWT"],
    stars:0,
    forks: 4,
    issues:4 ,
    url: "https://github.com/codinggita/trazex11",
    lastUpdated: "2024-03-",
    contributors: 3,
    languages: [
      { name: "Backend", percentage: 60 },
      { name: "React", percentage: 25 },
      { name: "Database", percentage: 15 }
    ],
    deployedUrl: "https://trazex11.netlify.app/",
    metrics: {
      performance: 92,
      security: 88,
      maintainability: 94
    },
    category: "AI",
    icon: "AI"
  },
  {
    name: "event_tracker",
    description: "Event Tracker is a modern platform designed to help users discover, create, and manage events effortlessly. From ticketing to notifications, it offers a seamless experience for both event attendees and organizers.",
    longDescription: "Event Tracker is a modern platform designed to help users discover, create, and manage events effortlessly. From ticketing to notifications, it offers a seamless experience for both event attendees and organizers.",
    techStack: ["Html", "Css", "React", "Node.js", "Mongodb"],
    stars: 0,
    forks: 5,
    issues: 1,
    url: "https://github.com/codinggita/event_tracker",
    lastUpdated: "2024-03-12",
    contributors: 4,
    languages: [
      { name: "React", percentage: 40 },
      { name: "Javascript", percentage: 35 },
      { name: "Node.js", percentage: 25 }
    ],
    deployedUrl: "https://chain-analytics.demo",
    metrics: {
      performance: 96,
      security: 98,
      maintainability: 92
    },
    category: "Event Management",
    icon: "Event Management"
  }
];

function Contribution() {
  const [expandedRepo, setExpandedRepo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredRepos = selectedCategory
    ? repositories.filter(repo => repo.category === selectedCategory)
    : repositories;

  return (
    <div className="min-h-screen bg-black text-[#E2E8F0]">
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center"
        style={{ mixBlendMode: 'overlay' }}
      />
      
      <div className="relative max-w-[1200px] mx-auto px-4 py-12">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Terminal size={32} className="text-[#4ADE80]" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00FF9D] to-[#00B8D4] text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(0,255,157,0.3)]">
            Open Source Contributions

            </h1>
          </div>
          <p className="mt-4 text-[#4ADE80] text-lg font-medium flex items-center gap-2">
            <Zap size={20} className="animate-pulse" />
            GitHub Activity
          </p>
        </header>

        <div className="mb-8 flex gap-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              !selectedCategory 
                ? 'bg-[#4ADE80] text-black font-medium'
                : 'text-[#4ADE80] border border-[#4ADE80]/30 hover:bg-[#4ADE80]/10'
            }`}
          >
            All Projects
          </button>
          {Object.entries(categoryIcons).map(([category, Icon]) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                selectedCategory === category
                  ? 'bg-[#4ADE80] text-black font-medium'
                  : 'text-[#4ADE80] border border-[#4ADE80]/30 hover:bg-[#4ADE80]/10'
              }`}
            >
              <Icon size={16} />
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRepos.map((repo) => {
            const Icon = categoryIcons[repo.icon];
            const isExpanded = expandedRepo === repo.name;

            return (
              <div 
                key={repo.name}
                className={`bg-[#151C24] rounded-2xl p-6 border border-[#1E2A3B] shadow-[0_8px_32px_rgba(0,255,157,0.1)] backdrop-blur-lg transition-all duration-300 hover:translate-y-[-8px] hover:shadow-[0_16px_48px_rgba(0,255,157,0.15)] group relative ${
                  isExpanded ? 'md:col-span-2 lg:col-span-3' : ''
                }`}
              >
                <div className="absolute top-4 right-4">
                  <Icon size={24} className="text-[#4ADE80] opacity-50" />
                </div>

                <h2 className="text-xl font-bold mb-3 text-[#4ADE80] pr-8">{repo.name}</h2>
                <p className="text-[#94A3B8] text-sm mb-4 line-clamp-2">
                  {isExpanded ? repo.longDescription : repo.description}
                </p>
                
                <button
                  onClick={() => setExpandedRepo(isExpanded ? null : repo.name)}
                  className="text-20px text-[#4ADE80] hover:underline mb-4 inline-block"
                >
                  {isExpanded ? 'Show less' : 'Read more'}
                </button>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {repo.techStack.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-[#1A2634] border border-[#4ADE80]/30 text-[#4ADE80]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-[#94A3B8]">
                    <Star size={16} className="text-[#4ADE80]" />
                    <span className="text-sm">{repo.stars}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#94A3B8]">
                    <GitFork size={16} className="text-[#4ADE80]" />
                    <span className="text-sm">{repo.forks}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#94A3B8]">
                    <Users size={16} className="text-[#4ADE80]" />
                    <span className="text-sm">{repo.contributors} contributors</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#94A3B8]">
                    <Clock size={16} className="text-[#4ADE80]" />
                    <span className="text-sm">{repo.lastUpdated}</span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-[#1A2634] rounded-lg">
                    <div className="text-center">
                      <div className="text-sm text-[#94A3B8] mb-1">Performance</div>
                      <div className="text-2xl font-bold text-[#4ADE80]">{repo.metrics.performance}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-[#94A3B8] mb-1">Security</div>
                      <div className="text-2xl font-bold text-[#4ADE80]">{repo.metrics.security}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-[#94A3B8] mb-1">Maintainability</div>
                      <div className="text-2xl font-bold text-[#4ADE80]">{repo.metrics.maintainability}%</div>
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Code2 size={16} className="text-[#4ADE80]" />
                    <span className="text-sm text-[#94A3B8]">Language Distribution</span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden bg-[#1A2634]">
                    {repo.languages.map((lang, index) => (
                      <div
                        key={lang.name}
                        style={{ width: `${lang.percentage}%` }}
                        className={`h-full ${
                          index === 0 ? 'bg-[#4ADE80]' :
                          index === 1 ? 'bg-[#00B8D4]' :
                          'bg-[#7C3AED]'
                        }`}
                        title={`${lang.name}: ${lang.percentage}%`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {repo.languages.map(lang => (
                      <div key={lang.name} className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${
                          lang === repo.languages[0] ? 'bg-[#4ADE80]' :
                          lang === repo.languages[1] ? 'bg-[#00B8D4]' :
                          'bg-[#7C3AED]'
                        }`} />
                        <span className="text-xs text-[#94A3B8]">{lang.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <a 
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-4 rounded-lg bg-gradient-to-r from-[#4ADE80] to-[#00B8D4] text-black text-center text-sm personally font-medium transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:ring-offset-2 focus:ring-offset-[#151C24] group-hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]"
                  >
                    View Code
                    <ExternalLink size={14} className="inline-block ml-2" />
                  </a>
                  {repo.deployedUrl && (
                    <a 
                      href={repo.deployedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-4 rounded-lg border border-[#4ADE80] text-[#4ADE80] text-center text-sm font-medium transition-all duration-200 hover:bg-[#4ADE80]/10 focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:ring-offset-2 focus:ring-offset-[#151C24]"
                    >
                      <Globe size={14} className="inline" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Contribution;