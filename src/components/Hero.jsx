import React from 'react';
import { Download, Mail } from 'lucide-react';
import { Github, Linkedin } from './Icons';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text Content */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left order-2 lg:order-1">
          {/* Welcome Tag */}
          <div className="inline-block px-4 py-1.5 rounded-full bg-tealGlow/10 border border-tealGlow/30 text-tealGlow text-sm font-semibold tracking-wide">
            Welcome to my portfolio
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Hi, I'm <span className="text-gradient">Ahmad Zahid</span>
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl sm:text-2xl text-gray-300 font-medium tracking-wide">
            MERN Stack Developer
          </h2>

          {/* Bio Description */}
          <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            I'm a MERN Stack Developer with hands-on experience building scalable web applications using React.js, Node.js, Express.js, and MongoDB.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-6 py-3 rounded-lg bg-tealGlow hover:bg-tealGlow/90 text-darkBg font-semibold shadow-lg shadow-tealGlow/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              View Portfolio
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-3 rounded-lg border border-[#242933] bg-[#0d0e12] hover:bg-white/5 text-white font-semibold transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Contact Me
            </button>
            <a
              href="/Ahmad_Zahid_Resume.pdf"
              download="Ahmad_Zahid_Resume.pdf"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-[#24262f] hover:bg-[#2e313c] border border-white/5 text-white font-semibold transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Download className="mr-2 h-4 w-4" /> Download CV
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center lg:justify-start gap-4 pt-6">
            <a
              href="https://github.com/AZahidTech"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 hover:bg-tealGlow/15 border border-white/10 hover:border-tealGlow text-gray-400 hover:text-white transition-all duration-300"
              title="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/ahmad-zahid-158874291"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 hover:bg-tealGlow/15 border border-white/10 hover:border-tealGlow text-gray-400 hover:text-white transition-all duration-300"
              title="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Profile Image (Glowing Circle) */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2 relative">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[410px] lg:h-[410px] flex items-center justify-center">
            {/* Ambient background glow */}
            <div className="absolute inset-0 rounded-full bg-tealGlow/10 blur-[60px] md:blur-[80px] animate-pulse"></div>

            {/* Glowing border circle */}
            <div className="relative w-full h-full rounded-full p-1 bg-gradient-to-tr from-tealGlow/20 to-tealGlow/70 animate-profile-glow flex items-center justify-center overflow-hidden">
              <div className="w-full h-full rounded-full bg-darkBg p-2 flex items-center justify-center overflow-hidden">
                <img
                  src="/ahmad_profile.png"
                  alt="Ahmad Zahid Professional Headshot"
                  className="w-full h-full object-cover rounded-full select-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
