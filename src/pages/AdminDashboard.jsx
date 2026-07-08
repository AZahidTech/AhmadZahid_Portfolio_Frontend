import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { 
  LogOut, Trash2, Mail, RefreshCw, MessageSquare, Clock, 
  Briefcase, Code2, Globe, Server, Cpu, Layout, Wrench, Database, 
  Brain, Home, Utensils, Plane, Plus, Edit, X, Save, ExternalLink 
} from 'lucide-react';

const getLucideIcon = (name) => {
  const icons = { Globe, Server, Layout, Cpu, Code2, Wrench, Database, Brain, Home, Utensils, Plane };
  const IconComp = icons[name] || Globe;
  return <IconComp className="h-5 w-5" />;
};

const IconDropdown = ({ value, onChange, availableIcons }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 rounded-lg bg-[#0e111a] border border-white/10 focus:border-tealGlow focus:outline-none text-white text-sm flex items-center justify-between transition-all"
      >
        <div className="flex items-center space-x-2.5">
          <span className="text-tealGlow">{getLucideIcon(value)}</span>
          <span className="font-semibold text-gray-200">{value}</span>
        </div>
        <span className="text-gray-400 pointer-events-none text-xs">▼</span>
      </button>

      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-2 rounded-xl bg-[#121624] border border-white/10 shadow-2xl max-h-60 overflow-y-auto scrollbar-thin">
          <div className="p-1.5 space-y-1">
            {availableIcons.map((icon) => (
              <button
                key={icon}
                type="button"
                onClick={() => {
                  onChange(icon);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 rounded-lg text-left text-sm flex items-center space-x-3 transition-colors ${
                  value === icon
                    ? 'bg-tealGlow/15 text-tealGlow font-bold'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className={value === icon ? 'text-tealGlow' : 'text-gray-400'}>
                  {getLucideIcon(icon)}
                </span>
                <span>{icon}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('messages');
  
  // Data States
  const [messages, setMessages] = useState([]);
  const [services, setServices] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const { logout, token } = useAuth();

  // Modal and Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('services'); // services, skills, experience, projects
  const [editingItem, setEditingItem] = useState(null); // null if adding new
  const [formData, setFormData] = useState({});

  // Delete Confirmation Modal State
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    type: '', // messages, services, skills, experience, projects
    id: null,
    displayName: ''
  });

  // List of common Lucide Icons that the user can choose from
  const availableIcons = [
    'Globe', 'Server', 'Layout', 'Cpu', 'Code2', 'Wrench', 
    'Database', 'Brain', 'Home', 'Utensils', 'Plane'
  ];

  // Fetch all dashboard data
  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      // 1. Fetch Messages (Admin Only)
      const resMsg = await api.get('/api/contact/messages');
      if (resMsg.data.success) setMessages(resMsg.data.data);

      // 2. Fetch Services
      const resServ = await api.get('/api/portfolio/services');
      if (resServ.data.success) setServices(resServ.data.data);

      // 3. Fetch Skills
      const resSkill = await api.get('/api/portfolio/skills');
      if (resSkill.data.success) setSkills(resSkill.data.data);

      // 4. Fetch Experience
      const resExp = await api.get('/api/portfolio/experience');
      if (resExp.data.success) setExperiences(resExp.data.data);

      // 5. Fetch Projects
      const resProj = await api.get('/api/portfolio/projects');
      if (resProj.data.success) setProjects(resProj.data.data);

    } catch (err) {
      console.error(err);
      setError('Could not connect to the server or fetch portfolio data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  // Request Custom Delete Confirm
  const requestDelete = (type, id, displayName) => {
    setDeleteConfirm({
      isOpen: true,
      type,
      id,
      displayName
    });
  };

  // Handle execute delete
  const executeDelete = async () => {
    const { type, id } = deleteConfirm;
    if (!id) return;
    setDeletingId(id);
    try {
      const url = type === 'messages' 
        ? `/api/contact/messages/${id}` 
        : `/api/portfolio/${type}/${id}`;
        
      const res = await api.delete(url);
      
      if (res.data.success) {
        if (type === 'messages') setMessages(messages.filter(msg => msg._id !== id));
        if (type === 'services') setServices(services.filter(item => item._id !== id));
        if (type === 'skills') setSkills(skills.filter(item => item._id !== id));
        if (type === 'experience') setExperiences(experiences.filter(item => item._id !== id));
        if (type === 'projects') setProjects(projects.filter(item => item._id !== id));
        
        setDeleteConfirm({ isOpen: false, type: '', id: null, displayName: '' });
      } else {
        alert(res.data.message || 'Failed to delete.');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error connecting to backend.');
    } finally {
      setDeletingId(null);
    }
  };

  // Open Form Modal
  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setIsModalOpen(true);

    if (item) {
      // Map existing item to form fields
      if (type === 'services') {
        setFormData({
          title: item.title || '',
          description: item.description || '',
          features: item.features ? item.features.join(', ') : '',
          icon: item.icon || 'Globe'
        });
      } else if (type === 'skills') {
        setFormData({
          category: item.category || '',
          skills: item.skills ? item.skills.join(', ') : '',
          icon: item.icon || 'Code2'
        });
      } else if (type === 'experience') {
        setFormData({
          company: item.company || '',
          role: item.role || '',
          duration: item.duration || '',
          location: item.location || '',
          points: item.points ? item.points.join(', ') : ''
        });
      } else if (type === 'projects') {
        setFormData({
          title: item.title || '',
          subtitle: item.subtitle || '',
          description: item.description || '',
          tech: item.tech ? item.tech.join(', ') : '',
          github: item.github || '',
          category: item.category || 'Full Stack',
          icon: item.icon || 'Brain'
        });
      }
    } else {
      // Empty form fields for new item
      if (type === 'services') {
        setFormData({ title: '', description: '', features: '', icon: 'Globe' });
      } else if (type === 'skills') {
        setFormData({ category: '', skills: '', icon: 'Code2' });
      } else if (type === 'experience') {
        setFormData({ company: '', role: '', duration: '', location: '', points: '' });
      } else if (type === 'projects') {
        setFormData({ title: '', subtitle: '', description: '', tech: '', github: '', category: 'Full Stack', icon: 'Brain' });
      }
    }
  };

  // Submit Form Modal (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingItem 
      ? `/api/portfolio/${modalType}/${editingItem._id}` 
      : `/api/portfolio/${modalType}`;
    const method = editingItem ? 'put' : 'post';

    // Format fields with array types
    const bodyData = { ...formData };
    if (bodyData.features) bodyData.features = bodyData.features.split(',').map(s => s.trim()).filter(Boolean);
    if (bodyData.skills) bodyData.skills = bodyData.skills.split(',').map(s => s.trim()).filter(Boolean);
    if (bodyData.points) bodyData.points = bodyData.points.split(',').map(s => s.trim()).filter(Boolean);
    if (bodyData.tech) bodyData.tech = bodyData.tech.split(',').map(s => s.trim()).filter(Boolean);

    try {
      const res = await api({
        method,
        url,
        data: bodyData
      });
      const data = res.data;

      if (data.success) {
        // Update local state without full reload
        if (modalType === 'services') {
          if (editingItem) {
            setServices(services.map(s => s._id === editingItem._id ? data.data : s));
          } else {
            setServices([...services, data.data]);
          }
        } else if (modalType === 'skills') {
          if (editingItem) {
            setSkills(skills.map(s => s._id === editingItem._id ? data.data : s));
          } else {
            setSkills([...skills, data.data]);
          }
        } else if (modalType === 'experience') {
          if (editingItem) {
            setExperiences(experiences.map(e => e._id === editingItem._id ? data.data : e));
          } else {
            setExperiences([...experiences, data.data]);
          }
        } else if (modalType === 'projects') {
          if (editingItem) {
            setProjects(projects.map(p => p._id === editingItem._id ? data.data : p));
          } else {
            setProjects([...projects, data.data]);
          }
        }
        setIsModalOpen(false);
      } else {
        alert(data.message || 'Operation failed.');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error connecting to backend.');
    }
  };



  return (
    <div className="min-h-screen bg-darkBg text-white">
      {/* Dashboard Header Banner */}
      <header className="bg-cardBg border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold tracking-tight text-white">Dashboard</span>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-tealGlow/15 text-tealGlow border border-tealGlow/25">Admin Portal</span>
          </div>

          <div className="flex items-center space-x-3.5">
            <Link
              to="/"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-tealGlow/10 hover:bg-tealGlow text-tealGlow hover:text-darkBg border border-tealGlow/25 hover:border-transparent text-sm font-semibold transition-all duration-200"
            >
              <ExternalLink className="h-4 w-4" />
              <span>View Site</span>
            </Link>
            <button
              onClick={fetchData}
              disabled={loading}
              className="inline-flex items-center justify-center p-2.5 rounded-lg bg-white/5 hover:bg-tealGlow/10 text-gray-400 hover:text-tealGlow border border-white/10 hover:border-tealGlow/30 transition-all duration-200 disabled:opacity-50"
              title="Refresh Dashboard"
            >
              <RefreshCw className={`h-4.5 w-4.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 hover:border-transparent text-sm font-semibold transition-all duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Dynamic Statistics Section */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="glass-card p-4 rounded-xl flex items-center space-x-3.5">
            <div className="h-10 w-10 rounded-lg bg-tealGlow/10 border border-tealGlow/20 flex items-center justify-center text-tealGlow">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400">Messages</p>
              <p className="text-xl font-extrabold">{messages.length}</p>
            </div>
          </div>
          <div className="glass-card p-4 rounded-xl flex items-center space-x-3.5">
            <div className="h-10 w-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400">Services</p>
              <p className="text-xl font-extrabold">{services.length}</p>
            </div>
          </div>
          <div className="glass-card p-4 rounded-xl flex items-center space-x-3.5">
            <div className="h-10 w-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400">Skill Groups</p>
              <p className="text-xl font-extrabold">{skills.length}</p>
            </div>
          </div>
          <div className="glass-card p-4 rounded-xl flex items-center space-x-3.5">
            <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400">Experiences</p>
              <p className="text-xl font-extrabold">{experiences.length}</p>
            </div>
          </div>
          <div className="glass-card p-4 rounded-xl flex items-center space-x-3.5 col-span-2 lg:col-span-1">
            <div className="h-10 w-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Layout className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400">Projects</p>
              <p className="text-xl font-extrabold">{projects.length}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto space-x-2 border-b border-white/5 pb-2 scrollbar-thin">
          {[
            { id: 'messages', label: 'Inbox', icon: Mail },
            { id: 'services', label: 'Services', icon: Globe },
            { id: 'skills', label: 'Skills', icon: Code2 },
            { id: 'experience', label: 'Experience', icon: Briefcase },
            { id: 'projects', label: 'Projects', icon: Layout }
          ].map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex-shrink-0 ${
                  activeTab === tab.id 
                    ? 'bg-tealGlow text-darkBg shadow-lg shadow-tealGlow/15 font-bold' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <TabIcon className="h-4.5 w-4.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Panel Contents */}
        <div className="space-y-4">
          
          {/* 1. MESSAGES INBOX TAB */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight">Inbox Messages</h2>
              {loading && messages.length === 0 ? (
                <div className="glass-card py-16 flex flex-col items-center justify-center space-y-4 rounded-2xl">
                  <div className="w-10 h-10 border-3 border-tealGlow border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-400 text-sm">Loading messages...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="glass-card py-16 text-center rounded-2xl text-gray-500">
                  <Mail className="mx-auto h-12 w-12 text-gray-600 mb-3" />
                  <p className="font-semibold text-base text-gray-400">Your inbox is empty</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {messages.map((msg) => (
                    <div key={msg._id} className="glass-card p-6 rounded-2xl border border-white/5 relative group">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="flex items-center space-x-2 flex-wrap">
                            <span className="font-bold text-white text-lg">{msg.name}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <a href={`mailto:${msg.email}`} className="text-tealGlow hover:underline text-sm font-semibold">{msg.email}</a>
                          </div>
                          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-gray-500" />
                            {new Date(msg.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => requestDelete('messages', msg._id, msg.name)}
                          disabled={deletingId === msg._id}
                          className="p-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 hover:border-transparent rounded-lg transition disabled:opacity-50"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                        <h4 className="text-sm font-bold text-gray-300">
                          Subject: <span className="text-white">{msg.subject}</span>
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line bg-black/25 p-4 rounded-xl">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 2. SERVICES TAB */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold tracking-tight">Manage Services (What I Offer)</h2>
                <button
                  onClick={() => openModal('services')}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-tealGlow text-darkBg hover:bg-tealGlow/90 rounded-lg text-sm font-bold shadow-md shadow-tealGlow/10 transition"
                >
                  <Plus className="h-4.5 w-4.5 stroke-[3]" />
                  <span>Add Service</span>
                </button>
              </div>

              {services.length === 0 ? (
                <div className="glass-card py-16 text-center rounded-2xl text-gray-500">
                  <Globe className="mx-auto h-12 w-12 text-gray-600 mb-3" />
                  <p className="font-semibold text-base text-gray-400">No services added yet</p>
                  <p className="text-xs text-gray-500 mt-1">Add details so they appear on your landing page.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((item) => (
                    <div key={item._id} className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="h-10 w-10 rounded-lg bg-tealGlow/15 text-tealGlow border border-tealGlow/25 flex items-center justify-center">
                            {getLucideIcon(item.icon)}
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => openModal('services', item)}
                              className="p-2 bg-white/5 border border-white/5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => requestDelete('services', item._id, item.title)}
                              className="p-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:text-white rounded-lg hover:bg-rose-500 transition"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-white">{item.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                        {item.features && item.features.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {item.features.map((f, i) => (
                              <span key={i} className="px-2 py-1 text-xs rounded bg-white/5 border border-white/5 text-gray-300">
                                {f}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. SKILLS TAB */}
          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold tracking-tight">Manage Skills</h2>
                <button
                  onClick={() => openModal('skills')}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-tealGlow text-darkBg hover:bg-tealGlow/90 rounded-lg text-sm font-bold shadow-md shadow-tealGlow/10 transition"
                >
                  <Plus className="h-4.5 w-4.5 stroke-[3]" />
                  <span>Add Skill Group</span>
                </button>
              </div>

              {skills.length === 0 ? (
                <div className="glass-card py-16 text-center rounded-2xl text-gray-500">
                  <Code2 className="mx-auto h-12 w-12 text-gray-600 mb-3" />
                  <p className="font-semibold text-base text-gray-400">No skill groups added yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skills.map((item) => (
                    <div key={item._id} className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-lg bg-tealGlow/15 text-tealGlow border border-tealGlow/25 flex items-center justify-center">
                              {getLucideIcon(item.icon)}
                            </div>
                            <h3 className="text-lg font-bold text-white">{item.category}</h3>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => openModal('skills', item)}
                              className="p-2 bg-white/5 border border-white/5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => requestDelete('skills', item._id, item.category)}
                              className="p-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:text-white rounded-lg hover:bg-rose-500 transition"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill, i) => (
                            <span key={i} className="px-3 py-1 rounded bg-[#121620] border border-white/5 text-gray-300 text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. EXPERIENCE TAB */}
          {activeTab === 'experience' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold tracking-tight">Manage Experience (Work History)</h2>
                <button
                  onClick={() => openModal('experience')}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-tealGlow text-darkBg hover:bg-tealGlow/90 rounded-lg text-sm font-bold shadow-md shadow-tealGlow/10 transition"
                >
                  <Plus className="h-4.5 w-4.5 stroke-[3]" />
                  <span>Add Experience</span>
                </button>
              </div>

              {experiences.length === 0 ? (
                <div className="glass-card py-16 text-center rounded-2xl text-gray-500">
                  <Briefcase className="mx-auto h-12 w-12 text-gray-600 mb-3" />
                  <p className="font-semibold text-base text-gray-400">No experiences added yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {experiences.map((item) => (
                    <div key={item._id} className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col sm:flex-row justify-between gap-4">
                      <div className="space-y-2 flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-white">{item.role}</h3>
                            <p className="text-tealGlow font-semibold text-md">{item.company}</p>
                          </div>
                          <div className="flex items-center space-x-2 sm:hidden">
                            <button
                              onClick={() => openModal('experience', item)}
                              className="p-2 bg-white/5 border border-white/5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => requestDelete('experience', item._id, `${item.role} at ${item.company}`)}
                              className="p-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:text-white rounded-lg hover:bg-rose-500 transition"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400">{item.duration} | {item.location}</p>
                        {item.points && item.points.length > 0 && (
                          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mt-2">
                            {item.points.map((p, i) => (
                              <li key={i}>{p}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="hidden sm:flex items-start space-x-2">
                        <button
                          onClick={() => openModal('experience', item)}
                          className="p-2 bg-white/5 border border-white/5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => requestDelete('experience', item._id, `${item.role} at ${item.company}`)}
                          className="p-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:text-white rounded-lg hover:bg-rose-500 transition"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 5. PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold tracking-tight">Manage Projects</h2>
                <button
                  onClick={() => openModal('projects')}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-tealGlow text-darkBg hover:bg-tealGlow/90 rounded-lg text-sm font-bold shadow-md shadow-tealGlow/10 transition"
                >
                  <Plus className="h-4.5 w-4.5 stroke-[3]" />
                  <span>Add Project</span>
                </button>
              </div>

              {projects.length === 0 ? (
                <div className="glass-card py-16 text-center rounded-2xl text-gray-500">
                  <Layout className="mx-auto h-12 w-12 text-gray-600 mb-3" />
                  <p className="font-semibold text-base text-gray-400">No projects added yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((item) => (
                    <div key={item._id} className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-2.5">
                            <div className="h-10 w-10 rounded-lg bg-tealGlow/15 text-tealGlow border border-tealGlow/25 flex items-center justify-center">
                              {getLucideIcon(item.icon)}
                            </div>
                            <div>
                              <h3 className="font-bold text-white">{item.title}</h3>
                              <span className="text-xs text-tealGlow font-semibold">{item.category}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => openModal('projects', item)}
                              className="p-2 bg-white/5 border border-white/5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => requestDelete('projects', item._id, item.title)}
                              className="p-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:text-white rounded-lg hover:bg-rose-500 transition"
                            >
                              <Trash2 className="h-4.5 w-4.5" />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                        {item.tech && item.tech.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {item.tech.map((t, i) => (
                              <span key={i} className="px-2 py-0.5 text-xs rounded bg-white/5 border border-white/5 text-gray-300">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* POPUP CARD MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121624] border border-white/10 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#121624] z-10">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>{editingItem ? 'Edit' : 'Add'} {modalType.slice(0, -1)}</span>
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              
              {/* --- SERVICES FORM --- */}
              {modalType === 'services' && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Service Title</label>
                    <input 
                      type="text" 
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0e111a] border border-white/10 focus:border-tealGlow focus:outline-none text-white text-sm"
                      placeholder="e.g. Full-Stack Web Development"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Description</label>
                    <textarea 
                      required
                      rows={3}
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0e111a] border border-white/10 focus:border-tealGlow focus:outline-none text-white text-sm leading-relaxed"
                      placeholder="Enter details..."
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Features / Bullets (Comma Separated)</label>
                    <input 
                      type="text"
                      value={formData.features || ''}
                      onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0e111a] border border-white/10 focus:border-tealGlow focus:outline-none text-white text-sm"
                      placeholder="e.g. MERN Applications, Redux State, API integrations"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Icon Badge</label>
                    <IconDropdown 
                      value={formData.icon || 'Globe'} 
                      onChange={(val) => setFormData({ ...formData, icon: val })} 
                      availableIcons={availableIcons} 
                    />
                  </div>
                </>
              )}

              {/* --- SKILLS FORM --- */}
              {modalType === 'skills' && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Skill Category</label>
                    <input 
                      type="text" 
                      required
                      value={formData.category || ''}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0e111a] border border-white/10 focus:border-tealGlow focus:outline-none text-white text-sm"
                      placeholder="e.g. Tools & Frameworks"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Skills (Comma Separated)</label>
                    <input 
                      type="text" 
                      required
                      value={formData.skills || ''}
                      onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0e111a] border border-white/10 focus:border-tealGlow focus:outline-none text-white text-sm"
                      placeholder="e.g. React.js, Node.js, Express.js, Tailwind CSS"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Icon Badge</label>
                    <IconDropdown 
                      value={formData.icon || 'Code2'} 
                      onChange={(val) => setFormData({ ...formData, icon: val })} 
                      availableIcons={availableIcons} 
                    />
                  </div>
                </>
              )}

              {/* --- EXPERIENCE FORM --- */}
              {modalType === 'experience' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Company Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.company || ''}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#0e111a] border border-white/10 focus:border-tealGlow focus:outline-none text-white text-sm"
                        placeholder="e.g. IIFA Tech"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Job Role</label>
                      <input 
                        type="text" 
                        required
                        value={formData.role || ''}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#0e111a] border border-white/10 focus:border-tealGlow focus:outline-none text-white text-sm"
                        placeholder="e.g. MERN Stack Intern"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Duration</label>
                      <input 
                        type="text" 
                        required
                        value={formData.duration || ''}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#0e111a] border border-white/10 focus:border-tealGlow focus:outline-none text-white text-sm"
                        placeholder="e.g. Nov 2025 – Present"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Location</label>
                      <input 
                        type="text" 
                        required
                        value={formData.location || ''}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#0e111a] border border-white/10 focus:border-tealGlow focus:outline-none text-white text-sm"
                        placeholder="e.g. Lahore, Pakistan"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bullet Points (Comma Separated)</label>
                    <textarea 
                      rows={4}
                      value={formData.points || ''}
                      onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0e111a] border border-white/10 focus:border-tealGlow focus:outline-none text-white text-sm leading-relaxed"
                      placeholder="e.g. Built and maintained MERN sites, Optimized Tailwind speeds, Worked on live projects"
                    />
                  </div>
                </>
              )}

              {/* --- PROJECTS FORM --- */}
              {modalType === 'projects' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Project Title</label>
                      <input 
                        type="text" 
                        required
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#0e111a] border border-white/10 focus:border-tealGlow focus:outline-none text-white text-sm"
                        placeholder="e.g. EstateSphere"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Subtitle</label>
                      <input 
                        type="text" 
                        required
                        value={formData.subtitle || ''}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#0e111a] border border-white/10 focus:border-tealGlow focus:outline-none text-white text-sm"
                        placeholder="e.g. MERN Real Estate Platform"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Description</label>
                    <textarea 
                      required
                      rows={3}
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0e111a] border border-white/10 focus:border-tealGlow focus:outline-none text-white text-sm leading-relaxed"
                      placeholder="Write project description..."
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tech Badges (Comma Separated)</label>
                    <input 
                      type="text" 
                      required
                      value={formData.tech || ''}
                      onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0e111a] border border-white/10 focus:border-tealGlow focus:outline-none text-white text-sm"
                      placeholder="e.g. React.js, Node.js, MongoDB, Tailwind CSS, JWT"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">GitHub URL</label>
                    <input 
                      type="url"
                      value={formData.github || ''}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0e111a] border border-white/10 focus:border-tealGlow focus:outline-none text-white text-sm"
                      placeholder="e.g. https://github.com/username/project"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Category</label>
                      <select
                        value={formData.category || 'Full Stack'}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#0e111a] border border-white/10 focus:border-tealGlow focus:outline-none text-white text-sm"
                      >
                        <option value="Full Stack">Full Stack</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="MongoDB">MongoDB</option>
                        <option value="MERN Stack">MERN Stack</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Icon Badge</label>
                      <IconDropdown 
                        value={formData.icon || 'Brain'} 
                        onChange={(val) => setFormData({ ...formData, icon: val })} 
                        availableIcons={availableIcons} 
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Modal Action Buttons */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4.5 py-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 text-sm font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-tealGlow text-darkBg hover:bg-tealGlow/90 text-sm font-bold shadow-lg shadow-tealGlow/10 transition"
                >
                  <Save className="h-4.5 w-4.5" />
                  <span>Save Changes</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirm.isOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121624] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden p-6 space-y-6">
            <div className="flex items-center space-x-3.5 text-rose-500">
              <div className="h-10 w-10 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <Trash2 className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Delete {deleteConfirm.type === 'messages' ? 'Message' : deleteConfirm.type.slice(0, -1)}</h3>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              Are you sure you want to delete {deleteConfirm.type === 'messages' ? 'message from' : deleteConfirm.type === 'experience' ? 'experience entry' : deleteConfirm.type.slice(0, -1)}: <strong className="text-white">{deleteConfirm.displayName}</strong>?
            </p>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setDeleteConfirm({ isOpen: false, type: '', id: null, displayName: '' })}
                className="px-4.5 py-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 text-sm font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                disabled={deletingId !== null}
                className="px-5 py-2.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold shadow-lg shadow-rose-500/15 transition disabled:opacity-55"
              >
                {deletingId ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
