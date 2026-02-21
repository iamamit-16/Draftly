import { ArrowLeftIcon } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from "react-router"
import toast from "react-hot-toast"
import api from '../axios'

const CreatePage = () => {
    const [title, setTitile] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!title.trim() || !content.trim()) {
            toast.error("All fields are required");
            return;
        }

        setLoading(true)
        try {
            await api.post("/notes", {
                title,
                content
            })
            toast.success("Note Created Successfully")
            navigate("/")
        } catch (error) {
            toast.error("Failed To Create Note")
        } finally {
            setLoading(false)
        }
    }

    return (
        /* Removed bg-base-200 to show App.jsx background */
        <div className='min-h-screen text-white'>
            <div className='container mx-auto px-4 py-8'>
                <div className='max-w-2xl mx-auto'>
                    
                    {/* Consistent Back Button */}
                    <Link to="/" className="btn btn-ghost mb-6 text-white hover:bg-white/10">
                        <ArrowLeftIcon className='size-5 mr-2' />
                        Back To Notes
                    </Link>

                    {/* Glassmorphism Card */}
                    <div className='card bg-base-100/50 backdrop-blur-sm border border-white/10 shadow-2xl'>
                        <div className='card-body'>
                            <h2 className='card-title text-2xl mb-6 text-white'>Create New Note</h2>
                            
                            <form onSubmit={handleSubmit}>
                                <div className='form-control mb-4'>
                                    <label className="label">
                                        <span className='label-text text-gray-300 font-semibold'>Title</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder='Note Title'
                                        className='input input-bordered bg-transparent border-white/20 text-white focus:border-primary'
                                        value={title}
                                        onChange={(e) => setTitile(e.target.value)}
                                    />
                                </div>

                                <div className='form-control mb-6'>
                                    <label className="label">
                                        <span className='label-text text-gray-300 font-semibold'>Content</span>
                                    </label>
                                    <textarea 
                                        placeholder='Write your note here...'
                                        className='textarea textarea-bordered bg-transparent border-white/20 text-white focus:border-primary h-48'
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </div>

                                <div className='card-actions flex justify-end'>
                                    <button 
                                        type="submit" 
                                        className='btn btn-primary px-8' 
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm"></span>
                                                Creating...
                                            </>
                                        ) : (
                                            "Create Note"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePage