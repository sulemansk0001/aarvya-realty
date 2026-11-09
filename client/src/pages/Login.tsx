import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { ScrollAnimation } from '../components/common/ScrollAnimation';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/properties');
    } else {
      setError(res.message || 'Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center py-16 px-4">
      <ScrollAnimation animation="slide-up" duration={600} className="w-full max-w-md">
        <div className="w-full bg-white rounded-2xl border border-[#E0E6ED] p-8 sm:p-10 shadow-card">
        <div className="text-center mb-8">
          <Logo variant="stacked" className="mb-4" />
          <h1 className="text-2xl font-poppins font-bold text-[#0B1F3B]">Sign In to Your Account</h1>
          <p className="text-xs text-[#667085] mt-1">
            Access your saved properties, enquiry history, and listings
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full pl-9 pr-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (min 6 chars)"
                className="w-full pl-9 pr-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37] focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#B9952D] text-white text-xs font-bold rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#E0E6ED] text-center text-xs text-[#667085]">
          <span>Don't have an account? </span>
          <Link to="/register" className="text-[#D4AF37] font-semibold hover:underline">
            Register here
          </Link>
        </div>
        </div>
      </ScrollAnimation>
    </div>
  );
};
