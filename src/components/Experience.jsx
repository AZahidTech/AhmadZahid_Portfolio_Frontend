import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import api from '../services/api';

const Experience = () => {
  const staticExperience = [
    {
      role: 'MERN Stack Intern',
      company: 'IIFA Tech',
      duration: 'Nov 2025 – Present',
      location: 'Lahore, Pakistan',
      points: [
        'Built and maintained full-stack web applications using React.js, Node.js, Express.js, and MongoDB.',
        'Designed and implemented RESTful APIs for efficient data handling and system integration.',
        'Developed secure authentication and authorization systems for user management.',
        'Optimized application performance and enhanced UI responsiveness using Tailwind CSS.',
        'Working on live projects.'
      ]
    }
  ];

  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await api.get('/api/portfolio/experience');
        const data = res.data;
        if (data.success && data.data && data.data.length > 0) {
          setExperiences(data.data);
        } else {
          setExperiences(staticExperience);
        }
      } catch (err) {
        setExperiences(staticExperience);
      }
    };
    fetchExperiences();
  }, []);

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-darkBg">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Section Header */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-tealGlow/10 border border-tealGlow/30 text-tealGlow text-sm font-semibold tracking-wide">
            Experience
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Work History</h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Building experience through hands-on projects and professional roles
          </p>
        </motion.div>

        {/* Experience Timeline Grid */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp._id || exp.company}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -3, borderColor: 'rgba(0, 230, 180, 0.25)' }}
              className="glass-card p-6 sm:p-8 rounded-2xl text-left border border-white/5 relative overflow-hidden transition-colors duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:space-x-6 space-y-4 md:space-y-0">
                {/* Left Icon Badge */}
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-xl bg-tealGlow/15 border border-tealGlow/30 flex items-center justify-center text-tealGlow shadow-[0_0_15px_rgba(13,148,136,0.15)]">
                    <Briefcase className="h-6 w-6" />
                  </div>
                </div>

                {/* Content Details */}
                <div className="flex-grow space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">{exp.role}</h3>
                      <span className="text-tealGlow font-semibold text-lg hover:underline transition">{exp.company}</span>
                    </div>
                    
                    {/* Meta details */}
                    <div className="flex flex-col sm:items-end gap-1.5 text-sm text-gray-400 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-tealGlow" /> {exp.duration}
                      </span>
                      <span className="flex items-center gap-1.5 sm:justify-end">
                        <MapPin className="h-4 w-4 text-tealGlow" /> {exp.location}
                      </span>
                    </div>
                  </div>

                  {exp.points && exp.points.length > 0 && (
                    <>
                      <p className="text-gray-300 font-medium border-l-2 border-tealGlow/50 pl-3">
                        {exp.role} at {exp.company} key responsibilities:
                      </p>

                      {/* Responsibilities list */}
                      <ul className="space-y-2.5 text-gray-400 text-base pl-2">
                        {exp.points.map((point, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-tealGlow mr-2.5 mt-1.5 h-1.5 w-1.5 rounded-full bg-tealGlow flex-shrink-0"></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
