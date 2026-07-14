import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Github } from './Icons';
import api from '../services/api';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState([]);

  const staticProjects = [
    {
      title: 'TalentHub Pro',
      subtitle: 'AI-Powered Recruitment Platform (FYP)',
      description: 'A full-stack AI recruitment platform featuring an NLP-based chatbot for resume parsing, candidate automated support, and interview question generation. Includes role-based dashboards for candidates, companies, and administrators.',
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'NLP Chatbot'],
      github: 'https://github.com/AZahidTech/TalentHubPro.git',
      category: 'Full Stack',
      icon: 'Brain',
    },
    {
      title: 'EstateSphere',
      subtitle: 'MERN Stack Real Estate Platform',
      description: 'A comprehensive property platform facilitating advanced search, role-based dashboards, and complete listing management. Implemented secure token-based authorization and granular backend REST APIs.',
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT'],
      github: 'https://github.com/AZahidTech/EstateSphere.git',
      category: 'Full Stack',
      icon: 'Home',
    },
    {
      title: 'Restaurant Application',
      subtitle: 'Responsive Order Placement UI',
      description: 'A responsive digital menu and order management client interface built with raw web modules. Features details tracking, cart caching, and dynamic item listings.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
      github: 'https://github.com/AZahidTech/restaurant-application.git',
      category: 'Frontend',
      icon: 'Utensils',
    },
    {
      title: 'Airline Booking Client',
      subtitle: 'Dynamic Flight Search & Booking Frontend',
      description: 'A responsive airline reservation interface featuring dynamic flight scheduling lists, interactive passenger details forms, and validation checks.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Flexbox'],
      github: 'https://github.com/AZahidTech',
      category: 'Frontend',
      icon: 'Plane',
    },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/api/portfolio/projects');
        const data = res.data;
        if (data.success && data.data && data.data.length > 0) {
          setProjects(data.data);
        } else {
          setProjects(staticProjects);
        }
      } catch (err) {
        setProjects(staticProjects);
      }
    };
    fetchProjects();
  }, []);

  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName] || Icons.Globe;
    return <IconComponent className="h-6 w-6 text-tealGlow" />;
  };

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(proj => proj.category === filter);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-darkBg/50 border-t border-b border-white/5">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-tealGlow/10 border border-tealGlow/30 text-tealGlow text-sm font-semibold tracking-wide">
            Projects
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Recent Projects</h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-lg mx-auto">
            A selection of full-stack systems and responsive client interfaces I have engineered
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex justify-center flex-wrap gap-2.5 sm:gap-3"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {['All', 'Full Stack', 'Frontend', 'Backend', 'MERN Stack', 'MongoDB'].map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 cursor-pointer ${filter === cat ? 'bg-tealGlow text-darkBg shadow-md shadow-tealGlow/20' : 'bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92, y: 10 }}
                transition={{ type: 'spring', stiffness: 100, damping: 16 }}
                whileHover={{ y: -6, borderColor: 'rgba(0, 230, 180, 0.35)', boxShadow: '0 15px 30px -10px rgba(0, 230, 180, 0.15)' }}
                key={project._id || project.title}
                className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6 border border-white/5 transition-colors duration-300"
              >
                <div className="space-y-4">
                  {/* Header title */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start space-x-3.5">
                      <div className="p-2.5 rounded-xl bg-tealGlow/10 border border-tealGlow/20 text-tealGlow flex items-center justify-center flex-shrink-0 mt-0.5">
                        {renderIcon(project.icon)}
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">{project.title}</h3>
                        <span className="text-tealGlow text-xs sm:text-sm font-semibold block mt-0.5">{project.subtitle}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-tealGlow/15 border border-tealGlow/25 text-tealGlow flex-shrink-0">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-xs rounded-md bg-white/5 border border-white/5 text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 3, color: '#00e6b4' }}
                    className="inline-flex items-center text-sm font-semibold text-gray-300 transition-colors duration-200"
                  >
                    <Github className="mr-1.5 h-4.5 w-4.5" /> Source Code
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
