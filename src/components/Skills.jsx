import React, { useState, useEffect } from 'react';
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

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-darkBg/30 border-t border-b border-white/5">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-tealGlow/10 border border-tealGlow/30 text-tealGlow text-sm font-semibold tracking-wide">
            Skills
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Technical Expertise</h2>
          <p className="text-gray-400 text-base sm:text-lg">
            A comprehensive toolkit for modern full-stack web development
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {categories.map((cat) => (
            <div
              key={cat._id || cat.category}
              className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between hover:border-tealGlow/30 hover:shadow-[0_0_30px_rgba(0,230,180,0.1)] transition-all duration-500"
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
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-full bg-[#121620] border border-white/5 hover:border-tealGlow hover:bg-tealGlow hover:text-darkBg text-gray-300 text-sm font-medium transition-all duration-300 cursor-default shadow-sm hover:shadow-[0_0_15px_rgba(0,230,180,0.3)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
