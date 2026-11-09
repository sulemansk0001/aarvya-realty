import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { isValidIndianMobile } from '../utils/formatters';
import { ScrollAnimation } from '../components/common/ScrollAnimation';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isValidIndianMobile(phone)) {
      setError('Please provide a valid 10-digit Indian mobile number.');
      return;
    }

    setLoading(true);
    const res = await register(name, email, phone, password);
    setLoading(false);

    if (res.success) {
      navigate('/properties');
    } else {
      setError(res.message || 'Registration failed. Please check inputs.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center py-16 px-4">
      <ScrollAnimation animation="slide-up" duration={600} className="w-full max-w-md">
        <div className="w-full bg-white rounded-2xl border border-[#E0E6ED] p-8 sm:p-10 shadow-card">
        <div className="text-center mb-8">
          <Logo variant="stacked" className="mb-4" />
          <h1 className="text-2xl font-poppins font-bold text-[#0B1F3B]">Create Your Account</h1>
          <p className="text-xs text-[#667085] mt-1">
            Join Aarvya Realty for tailored Pune property updates and alerts
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
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Anand Kulkarni"
                className="w-full pl-9 pr-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full pl-9 pr-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
              Indian Mobile Number (+91) *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="98XXXXXXXX"
                className="w-full pl-9 pr-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a password (min 6 chars)"
                className="w-full pl-9 pr-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37] focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#B9952D] text-white text-xs font-bold rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#E0E6ED] text-center text-xs text-[#667085]">
          <span>Already registered? </span>
          <Link to="/login" className="text-[#D4AF37] font-semibold hover:underline">
            Sign In here
          </Link>
        </div>
        </div>
      </ScrollAnimation>
    </div>
  );
};
