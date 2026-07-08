import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-darkBg">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-tealGlow/10 border border-tealGlow/30 text-tealGlow text-sm font-semibold tracking-wide">
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Get to Know Me</h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Passionate about building scalable, full-stack web solutions
          </p>
        </div>

        {/* Content Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left max-w-5xl mx-auto pt-6">
          {/* Paragraphs - col-span-7 */}
          <div className="lg:col-span-7 space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
            <h3 className="text-2xl font-bold text-tealGlow mb-4">Who I Am</h3>
            <p>
              I'm a MERN Stack Developer with hands-on experience building scalable web applications using React.js, Node.js, Express.js, and MongoDB.
            </p>
            <p>
              I specialize in designing RESTful APIs, implementing secure authentication and role-based access control, and crafting responsive interfaces with Tailwind CSS. My work is backed by a strong foundation in JavaScript, Object-Oriented Programming, and Data Structures & Algorithms.
            </p>
            <p>
              I enjoy turning real-world problems into clean, maintainable code — from AI-powered platforms to real estate marketplaces — and I'm always exploring new technologies in the modern web ecosystem.
            </p>
          </div>
          
          {/* Quick Info Grid - col-span-5 */}
          <div className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-2xl border border-white/5 space-y-6">
            <h3 className="text-xl font-bold text-white border-b border-white/5 pb-3">Personal Details</h3>
            <div className="space-y-4 text-sm sm:text-base">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-gray-400 font-medium">Role</span>
                <span className="text-tealGlow font-semibold">MERN Developer</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-gray-400 font-medium">Experience</span>
                <span className="text-white">1+ Years</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-gray-400 font-medium">Location</span>
                <span className="text-white">Lahore, Pakistan</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-gray-400 font-medium">Email</span>
                <span className="text-white hover:text-tealGlow transition"><a href="mailto:chaudaryahmad111@gmail.com">chaudaryahmad111@gmail.com</a></span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-gray-400 font-medium">Freelance</span>
                <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full text-xs">Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
