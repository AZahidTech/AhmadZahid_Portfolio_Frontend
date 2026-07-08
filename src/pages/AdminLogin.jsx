import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Lock, User as UserIcon, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(username, password);

    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message || 'Invalid username or password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-darkBg flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Return to Portfolio Link */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 inline-flex items-center text-sm font-semibold text-gray-400 hover:text-tealGlow transition-colors duration-200"
      >
        <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to Portfolio
      </Link>

      <div className="w-full max-w-md space-y-8 glass-card p-8 sm:p-10 rounded-2xl border border-white/5 relative z-10 shadow-2xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 rounded-xl bg-tealGlow/15 border border-tealGlow/30 flex items-center justify-center text-tealGlow shadow-[0_0_15px_rgba(13,148,136,0.15)]">
            <Lock className="h-6 w-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Admin Portal</h2>
          <p className="text-sm text-gray-400">
            Sign in to access your portfolio messages dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Error message alert */}
          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-sm flex items-start space-x-2.5">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Username */}
          <div className="space-y-1.5">
            <label htmlFor="username" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                <UserIcon className="h-5 w-5" />
              </div>
              <input
                type="text"
                id="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-tealGlow focus:ring-1 focus:ring-tealGlow transition"
                placeholder="Admin username"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-tealGlow focus:ring-1 focus:ring-tealGlow transition"
                placeholder="Admin password"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-lg bg-tealGlow hover:bg-tealGlow/90 disabled:bg-tealGlow/50 text-darkBg font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-tealGlow/20 transition-all duration-300 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
