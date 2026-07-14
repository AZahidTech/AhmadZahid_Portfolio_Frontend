import React from 'react';
import { motion } from 'framer-motion';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.85, rotate: -2 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 60,
        damping: 12,
        delay: 0.4,
      },
    },
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text Content */}
        <motion.div 
          className="lg:col-span-7 space-y-6 text-center lg:text-left order-2 lg:order-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Welcome Tag */}
          <motion.div 
            variants={itemVariants}
            className="inline-block px-4 py-1.5 rounded-full bg-tealGlow/10 border border-tealGlow/30 text-tealGlow text-sm font-semibold tracking-wide"
          >
            Welcome to my portfolio
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
          >
            Hi, I'm <span className="text-gradient">Ahmad Zahid</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2 
            variants={itemVariants}
            className="text-xl sm:text-2xl text-gray-300 font-medium tracking-wide"
          >
            MERN Stack Developer
          </motion.h2>

          {/* Bio Description */}
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            I'm a MERN Stack Developer with hands-on experience building scalable web applications using React.js, Node.js, Express.js, and MongoDB.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('projects')}
              className="px-6 py-3 rounded-lg bg-tealGlow hover:bg-tealGlow/90 text-darkBg font-semibold shadow-lg shadow-tealGlow/20 transition-shadow duration-300 cursor-pointer"
            >
              View Portfolio
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('contact')}
              className="px-6 py-3 rounded-lg border border-[#242933] bg-[#0d0e12] hover:bg-white/5 text-white font-semibold transition-colors duration-300 cursor-pointer"
            >
              Contact Me
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="/Ahmad_Zahid_Resume.pdf"
              download="Ahmad_Zahid_Resume.pdf"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-[#24262f] hover:bg-[#2e313c] border border-white/5 text-white font-semibold transition-colors duration-300"
            >
              <Download className="mr-2 h-4 w-4" /> Download CV
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center lg:justify-start gap-4 pt-6"
          >
            <motion.a
              whileHover={{ scale: 1.12, y: -3 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/AZahidTech"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 hover:bg-tealGlow/15 border border-white/10 hover:border-tealGlow text-gray-400 hover:text-white transition-colors duration-300"
              title="GitHub"
            >
              <Github className="h-5 w-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.12, y: -3 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.linkedin.com/in/ahmad-zahid-158874291"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 hover:bg-tealGlow/15 border border-white/10 hover:border-tealGlow text-gray-400 hover:text-white transition-colors duration-300"
              title="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Profile Image (Glowing Circle) */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2 relative">
          <motion.div 
            className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[410px] lg:h-[410px] flex items-center justify-center"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
