import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import api from '../services/api';

const Services = () => {
  const staticServices = [
    {
      title: 'Full-Stack Web Development',
      description: 'End-to-end development of scalable and interactive web systems using the MERN stack. Crafting cohesive architectures from front to back.',
      icon: 'Globe',
      features: ['Complete MERN Applications', 'State Management & Redux', 'Role-Based Dashboard Portals', 'Cross-Platform Integrations']
    },
    {
      title: 'Backend Development',
      description: 'Building secure, robust, and highly-performant server-side services. Engineering custom databases, controllers, and routing structures.',
      icon: 'Server',
      features: ['Node.js & Express.js Services', 'RESTful API Engineering', 'JWT Auth & RBAC Security', 'Middleware & Error Handling']
    },
    {
      title: 'Frontend Web Development',
      description: 'Designing highly responsive, pixel-perfect, and modern interactive user interfaces using React.js, Tailwind CSS, and HTML/CSS.',
      icon: 'Layout',
      features: ['React.js Single Page Apps', 'Figma/PSD-to-React Code', 'Responsive Layout Designs', 'SEO & Performance Tweaks']
    },
    {
      title: 'Database & API Solutions',
      description: 'Engineering database schemas, data modeling, and connecting third-party API configurations or AI integrations.',
      icon: 'Cpu',
      features: ['MongoDB Schema Modeling', 'MySQL Query Engineering', 'AI/NLP Chatbot Integrations', 'Third-Party Services Connect']
    }
  ];

  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/api/portfolio/services');
        const data = res.data;
        if (data.success && data.data && data.data.length > 0) {
          setServices(data.data);
        } else {
          setServices(staticServices);
        }
      } catch (err) {
        setServices(staticServices);
      }
    };
    fetchServices();
  }, []);

  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName] || Icons.Globe;
    return <IconComponent className="h-6 w-6 text-tealGlow" />;
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-darkBg">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-tealGlow/10 border border-tealGlow/30 text-tealGlow text-sm font-semibold tracking-wide">
            Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">What I Offer</h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Professional web development services tailored to your needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {services.map((service) => (
            <div
              key={service._id || service.title}
              className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between"
            >
              <div className="space-y-5">
                {/* Header Icon */}
                <div className="h-12 w-12 rounded-xl bg-tealGlow/15 border border-tealGlow/30 flex items-center justify-center text-tealGlow shadow-[0_0_15px_rgba(13,148,136,0.15)]">
                  {renderIcon(service.icon)}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white tracking-wide">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>

                {/* Bullet Points */}
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 pt-3 border-t border-white/5">
                  {(service.features || service.bullets || []).map((bullet) => (
                    <div key={bullet} className="flex items-center space-x-2 text-sm text-gray-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-tealGlow flex-shrink-0"></span>
                      <span>{bullet}</span>
                    </div>
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

export default Services;
