import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setStatusMessage('');

    try {
      const res = await api.post('/api/contact', formData);
      const data = res.data;

      if (data.success) {
        setStatus('success');
        setStatusMessage(data.message || 'Thank you! Your message has been sent.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setStatusMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || 'Could not connect to the server. Please try again later.';
      setStatus('error');
      setStatusMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-darkBg">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-tealGlow/10 border border-tealGlow/30 text-tealGlow text-sm font-semibold tracking-wide">
            Contact
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Get in Touch</h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-lg mx-auto">
            Have a project in mind, want to collaborate, or just want to say hi? Send me a message!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white tracking-wide">Contact Information</h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                Feel free to reach out to me through my contact details or use the form to drop a message.
              </p>

              <div className="space-y-5 pt-4">
                {/* Email */}
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-lg bg-tealGlow/15 border border-tealGlow/20 flex items-center justify-center text-tealGlow">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider">Email</h4>
                    <a href="mailto:chaudaryahmad111@gmail.com" className="text-gray-200 hover:text-tealGlow text-sm sm:text-base transition-colors">
                      chaudaryahmad111@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-lg bg-tealGlow/15 border border-tealGlow/20 flex items-center justify-center text-tealGlow">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider">Phone</h4>
                    <a href="tel:+923044884867" className="text-gray-200 hover:text-tealGlow text-sm sm:text-base transition-colors">
                      +92 304 4884867
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-lg bg-tealGlow/15 border border-tealGlow/20 flex items-center justify-center text-tealGlow">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider">Address</h4>
                    <span className="text-gray-200 text-sm sm:text-base">
                      Lahore, Pakistan
                    </span>
                  </div>
                </div>
              </div>
            </div>


          </div>

          {/* Contact Form Card */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Alert Message */}
              {status && (
                <div className={`p-4 rounded-xl flex items-start space-x-3 text-sm ${status === 'success' ? 'bg-emerald-500/10 border border-emerald-500/25 text-emerald-300' : 'bg-rose-500/10 border border-rose-500/25 text-rose-300'}`}>
                  {status === 'success' ? <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" /> : <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />}
                  <span>{statusMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-tealGlow focus:ring-1 focus:ring-tealGlow transition"
                    placeholder="John Doe"
                  />
                </div>
                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-tealGlow focus:ring-1 focus:ring-tealGlow transition"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-tealGlow focus:ring-1 focus:ring-tealGlow transition"
                  placeholder="Inquiry about full-stack services"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-tealGlow focus:ring-1 focus:ring-tealGlow transition resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-lg bg-tealGlow hover:bg-tealGlow/90 disabled:bg-tealGlow/50 text-darkBg font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-tealGlow/20 transition-all duration-300 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending message...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4.5 w-4.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
