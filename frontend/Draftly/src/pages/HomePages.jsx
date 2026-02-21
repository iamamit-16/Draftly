import React, { useEffect, useState } from 'react'
import { Navbar } from '../component/Navbar'
import { NoteCard } from '../component/NoteCard'
import api from '../axios'

function HomePages() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes")
        console.log(res.data);
        setNotes(res.data);
      } catch (error) {
        console.error("Error Fetching Data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, [])

  return (
    <div className='min-h-screen text-white'>
      <Navbar />
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        
        {/* Updated Loading State with Spinner */}
        {loading && (
          <div className='flex flex-col items-center justify-center py-24'>
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className='text-gray-400 mt-4 animate-pulse'>Loading your notes...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && notes.length === 0 && (
          <div className='text-center py-20 bg-base-100/30 rounded-xl border border-white/10 backdrop-blur-sm'>
            <p className='text-xl text-gray-400'>No notes found.</p>
            <p className='text-sm text-gray-500 mt-2'>Create your first one to get started!</p>
          </div>
        )}

        {/* Notes Grid */}
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