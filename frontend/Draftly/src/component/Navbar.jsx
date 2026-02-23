import React from 'react';
import { PlusIcon, LogOutIcon, UserIcon } from "lucide-react";
import { Link, useNavigate } from "react-router"; // Use useNavigate for redirection
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice'; // Import your logout action
import toast from 'react-hot-toast';

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout()); 
    toast.success("Logged out successfully");
    navigate('/login'); 
  };

  return (
    <header className='bg-base-200 border-b border-base-content/5 sticky top-0 z-50 backdrop-blur-md'>
      <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
          <Link to="/">
            <h1 className='text-3xl font-bold text-primary font-mono'>Draftly</h1>
          </Link>

          <div className='flex items-center gap-4'>
            <Link to={"/create"} className='btn btn-primary btn-sm md:btn-md'>
              <PlusIcon className='size-5'/>
              <span className='hidden sm:inline'>New Note</span>
            </Link>

            {user && (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-10">
                    <span className="text-xs uppercase">{user.name?.charAt(0) || <UserIcon size={16}/>}</span>
                  </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52 border border-white/5">
                  <li className="px-4 py-2 text-xs opacity-60 truncate">{user.email}</li>
                  <li>
                    <button onClick={handleLogout} className="text-error flex items-center gap-2">
                      <LogOutIcon size={16} />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};