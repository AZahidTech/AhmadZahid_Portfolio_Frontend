import React from 'react';
import { Mail } from 'lucide-react';
import { Github, Linkedin } from './Icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-darkBg border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Column */}
        <div className="text-center md:text-left space-y-1">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Ahmad Zahid. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Designed and engineered with React & Tailwind CSS.
          </p>
        </div>

        {/* Center / Quick scroll */}
        <div>
          <button 
            onClick={scrollToTop}
            className="text-xs text-gray-400 hover:text-tealGlow font-semibold transition"
          >
            Back to Top
          </button>
        </div>

        {/* Right Column / Social links */}
        <div className="flex gap-4">
          <a
            href="https://github.com/AZahidTech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/ahmad-zahid-158874291"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
