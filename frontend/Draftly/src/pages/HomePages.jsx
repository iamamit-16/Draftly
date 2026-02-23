import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes } from '../redux/noteSlice'; 
import { NoteCard } from '../component/NoteCard'
import { useEffect } from 'react';
import {Navbar} from "../component/Navbar"
import api from '../axios'

function HomePages() {
  const dispatch = useDispatch()
  
  const { items: notes, loading, error } = useSelector((state) => state.notes);

 useEffect(() => {
    if (notes.length === 0) {
    dispatch(fetchNotes());
  }
}, [dispatch, notes.length]);

  return (
    <div className='min-h-screen text-white'>
      <Navbar />
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        
        {loading && (
          <div className='flex flex-col items-center justify-center py-24'>
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className='text-gray-400 mt-4 animate-pulse'>Loading your notes...</p>
          </div>
        )}

        {!loading && notes.length === 0 && (
          <div className='text-center py-20 bg-base-100/30 rounded-xl border border-white/10 backdrop-blur-sm'>
            <p className='text-xl text-gray-400'>No notes found.</p>
            <p className='text-sm text-gray-500 mt-2'>Create your first one to get started!</p>
          </div>
        )}

        {!loading && notes.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePages