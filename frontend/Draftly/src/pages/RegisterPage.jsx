import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { register } from '../redux/authSlice'; 
import { Eye, EyeOff } from 'lucide-react'; 
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(register(formData));
    if (register.fulfilled.match(resultAction)) {
      toast.success('Account created!');
      navigate('/'); 
    } else {
      toast.error(resultAction.payload || 'Registration failed');

    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-96 bg-base-100/50 backdrop-blur-md shadow-xl border border-white/10">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-white">Join Draftly</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" placeholder="Name" className="input input-bordered w-full bg-black/20"
              onChange={(e) => setFormData({...formData, name: e.target.value})} required 
            />
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
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
              <button type="submit" disabled={loading} className="btn btn-primary w-full">{loading ? (<span className="loading loading-spinner"></span>) : ("Register")}
</button>
          </form>
          <p className="text-sm text-center mt-4">
            Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;