import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-darkBg text-white selection:bg-tealGlow/30 selection:text-white">
      {/* Navigation Menu */}
      <Navbar />

      {/* Hero Header */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Experience Section */}
      <Experience />

      {/* Skills Section */}
      <Skills />

      {/* Services Section */}
      <Services />

      {/* Projects Section */}
      <Projects />

      {/* Contact Form Section */}
      <Contact />

      {/* Footer Branding */}
      <Footer />
    </div>
  );
};

export default Portfolio;
