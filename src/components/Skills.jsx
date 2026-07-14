import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import api from '../services/api';

const Skills = () => {
  const staticCategories = [
    {
      category: 'Languages',
      icon: 'Code2',
      skills: ['C++', 'JavaScript', 'HTML5', 'CSS3'],
    },
    {
      category: 'Tools & Frameworks',
      icon: 'Wrench',
      skills: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Git', 'GitHub', 'Postman'],
    },
    {
      category: 'Databases',
      icon: 'Database',
      skills: ['MongoDB', 'MySQL'],
    },
    {
      category: 'Other Skills',
      icon: 'Globe',
      skills: [
        'Data Structures',
        'OOP',
        'RESTful APIs',
        'JWT Authentication',
        'Role-Based Access Control',
        'AI/NLP Integration',
        'Responsive UI Design',
        'Debugging & Problem Solving',
      ],
    },
  ];

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get('/api/portfolio/skills');
        const data = res.data;
        if (data.success && data.data && data.data.length > 0) {
          setCategories(data.data);
        } else {
          setCategories(staticCategories);
        }
      } catch (err) {
        setCategories(staticCategories);
      }
    };
    fetchSkills();
  }, []);

  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName] || Icons.Globe;
    return <IconComponent className="h-6 w-6 text-tealGlow" />;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-darkBg/30 border-t border-b border-white/5">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        {/* Section Header */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-tealGlow/10 border border-tealGlow/30 text-tealGlow text-sm font-semibold tracking-wide">
            Skills
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Technical Expertise</h2>
          <p className="text-gray-400 text-base sm:text-lg">
            A comprehensive toolkit for modern full-stack web development
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {categories.map((cat) => (
            <motion.div
              key={cat._id || cat.category}
              variants={cardVariants}
              whileHover={{ y: -5, borderColor: 'rgba(0, 230, 180, 0.35)', boxShadow: '0 15px 30px -10px rgba(0, 230, 180, 0.15)' }}
              className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between transition-colors duration-300"
            >
              <div className="space-y-5">
                {/* Category Header */}
                <div className="flex items-center space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-tealGlow/15 border border-tealGlow/25 text-tealGlow flex items-center justify-center">
                    {renderIcon(cat.icon)}
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-wide">{cat.category || cat.title}</h3>
                </div>

                {/* Skills Pills */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {cat.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.08, y: -2, rotate: [0, -1, 1, 0] }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-full bg-[#121620] border border-white/5 hover:border-tealGlow hover:bg-tealGlow hover:text-darkBg text-gray-300 text-sm font-medium transition-colors duration-200 cursor-default shadow-sm hover:shadow-[0_0_15px_rgba(0,230,180,0.3)]"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
