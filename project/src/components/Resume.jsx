import React, { useState } from 'react';
import { Briefcase, GraduationCap, Code, User, ArrowRight } from 'lucide-react';

export function Resume() {
  const [activeSection, setActiveSection] = useState('experience');

  const menuItems = [
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'about', label: 'About Me', icon: User },
  ];

  const experiences = [
    {
      title: 'Junior Full Stack Developer',
      company: 'TechCorp Inc', // Added missing company field
      period: '2023 - Present', // Added sample period
      location: 'Remote', // Added sample location
      description: 'Leading development of enterprise-grade web applications using modern tech stacks.',
      details: 'Responsible for end-to-end development, from architecture design to deployment, focusing on scalability and user experience.',
      achievements: [
        'Architected microservices infrastructure serving 100K+ users',
        'Reduced loading times by 60% through optimization techniques',
        'Mentored 5 junior developers in React and Node.js',
        'Implemented CI/CD pipelines using GitHub Actions',
      ],
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Solutions Ltd',
      period: '2021 - 2023', // Added sample period
      location: 'New York, NY', // Added sample location
      description: 'Developed and maintained responsive web applications for diverse clients.',
      details: 'Collaborated with design teams to create visually appealing and functional interfaces.',
      achievements: [
        'Built and deployed 20+ client websites using React',
        'Created reusable component library for design systems',
        'Optimized frontend performance by 40%',
        'Led UI/UX initiatives for 3 major projects',
      ],
    },
  ];

  const education = [
    {
      degree: 'Bachelor of Computer Science',
      institution: 'Rai University',
      period: '2024 - 2028',
      location: 'Ahmedabad, Dhodka',
      description: 'Core foundation in computer science principles and programming.',
      details: 'Comprehensive coursework in algorithms, data structures, and software development.',
      achievements: [
        '9 CGPA',
        "Dean's List all semesters",
        'President of Computer Science Club (2025-2026)', // Adjusted years to match period
        'Completed internship at major tech firm',
        'Received Junior Project Award for web platform',
      ],
    },
  ];

  const skills = {
    frontend: ['React', 'JavaScript', 'HTML', 'Tailwind CSS', 'Redux', 'CSS'], // Capitalized consistently
    backend: ['Node.js', 'Express', 'Postman', 'MongoDB'], // Corrected 'PostMan' to 'Postman'
    tools: ['Git', 'EmailJS', 'Figma', 'JWT', 'Vite'], // Capitalized 'Email js' to 'EmailJS'
    programmingLanguages: ['C++', 'C', 'JavaScript'], // Renamed 'Programing_Language' to 'programmingLanguages', capitalized consistently
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'experience':
        return (
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-white/5 border border-green-500/20 hover:bg-green-500/5 transition-all duration-300"
                style={{ animation: `fadeInUp 0.6s ease-out ${0.2 * index}s both` }}
              >
                <h3 className="text-lg font-bold mb-1 text-green-500">{exp.title}</h3>
                <div className="text-gray-400 text-sm mb-2">
                  {exp.company} • {exp.period} • {exp.location}
                </div>
                <p className="text-gray-300 text-sm mb-2">{exp.description}</p>
                <p className="text-gray-500 text-xs mb-3 italic">{exp.details}</p>
                <ul className="space-y-1">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-center text-gray-400 text-xs">
                      <ArrowRight size={14} className="mr-2 text-green-500" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      case 'education':
        return (
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-white/5 border border-green-500/20 hover:bg-green-500/5 transition-all duration-300"
                style={{ animation: `fadeInUp 0.6s ease-out ${0.2 * index}s both` }}
              >
                <h3 className="text-lg font-bold mb-1 text-green-500">{edu.degree}</h3>
                <div className="text-gray-400 text-sm mb-2">
                  {edu.institution} • {edu.period} • {edu.location}
                </div>
                <p className="text-gray-300 text-sm mb-2">{edu.description}</p>
                <p className="text-gray-500 text-xs mb-3 italic">{edu.details}</p>
                <ul className="space-y-1">
                  {edu.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-center text-gray-400 text-xs">
                      <ArrowRight size={14} className="mr-2 text-green-500" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      case 'skills':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, skillList], index) => (
              <div
                key={category}
                className="p-4 rounded-lg bg-white/5 border border-green-500/20"
                style={{ animation: `scaleIn 0.6s ease-out ${0.2 * index}s both` }}
              >
                <h3 className="text-lg font-bold mb-3 capitalize text-green-500">
                  {category.replace(/([A-Z])/g, ' $1').trim()} {/* Improved readability */}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'about':
        return (
          <div
            className="p-4 rounded-lg bg-white/5 border border-green-500/20"
            style={{ animation: 'fadeInUp 0.6s ease-out' }}
          >
            <h3 className="text-lg font-bold mb-3 text-green-500">About Me</h3>
            <p className="text-gray-300 text-sm mb-4">
              I'm a passionate Full Stack Developer specializing in creating modern web applications. My journey began with a deep curiosity about technology, leading me to pursue advanced education and work with innovative companies worldwide.
            </p>
            <p className="text-gray-300 text-sm mb-4">
              I excel in building scalable solutions using modern frameworks, with a keen eye for design and usability. My goal is to craft digital experiences that solve real problems while pushing the boundaries of what's possible.
            </p>
            <div className="space-y-3">
              <h4 className="text-base font-bold text-green-500">What I Bring:</h4>
              <ul className="space-y-1">
                {[
                  'Expertise in scalable web architecture design',
                  'Leadership in cross-functional dev teams',
                  'Strong communication with clients & stakeholders',
                  'Commitment to latest tech trends & best practices',
                ].map((point, index) => (
                  <li key={index} className="flex items-center text-gray-400 text-xs">
                    <ArrowRight size={14} className="mr-2 text-green-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const resumeAnimations = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `;

  return (
    <section
      id="resume"
      className="py-12 relative overflow-hidden bg-black" // Added bg-black for better contrast
      style={{ animation: 'fadeInUp 0.8s ease-out' }}
    >
      <style>{resumeAnimations}</style>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1)_0,rgba(0,0,0,0)_50%)]" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10" style={{ animation: 'slideInLeft 0.8s ease-out' }}>
          <h2 className="text-2xl md:text-4xl font-bold mb-3 glitch-text">Resume</h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            A concise overview of my professional journey, skills, and achievements.
          </p>
        </div>

        <div className="grid md:grid-cols-[200px,1fr] gap-6">
          <div className="space-y-1">
            {menuItems.map(({ id, label, icon: Icon }, index) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 transition-all duration-300 ${
                  activeSection === id
                    ? 'bg-green-500/20 text-green-500'
                    : 'hover:bg-white/5 text-gray-400'
                }`}
                style={{ animation: `slideInLeft 0.6s ease-out ${0.2 * index}s both` }}
              >
                <Icon size={18} />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>

          <div className="min-h-[400px]">{renderContent()}</div>
        </div>
      </div>
    </section>
  );
}