import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { login } from '../redux/authSlice';
import { Eye, EyeOff } from 'lucide-react'; 
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(login(formData));
    if (login.fulfilled.match(resultAction)) {
      toast.success('Welcome back!');
      navigate('/');
    } else {
      toast.error(resultAction.payload || 'Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-96 bg-base-100/50 backdrop-blur-md shadow-xl border border-white/10">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-white">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="email" placeholder="Email" className="input input-bordered w-full bg-black/20"
              onChange={(e) => setFormData({...formData, email: e.target.value})} required 
            />
            
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                className="input input-bordered w-full bg-black/20 pr-10"
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                required 
              />
              <button 
                type="button"
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)} // Toggles state
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-full">
              {loading ? (<span className="loading loading-spinner"></span>) : ("Login")}
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            New here? <Link to="/register" className="text-blue-400 hover:underline">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;