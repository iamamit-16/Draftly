import React from 'react'
import {Link} from "react-router"
import { PenSquareIcon, TrashIcon } from 'lucide-react'
import  {formatDate } from './utils'
import api from "../axios"
import toast from "react-hot-toast"
import { useDispatch } from 'react-redux'
import { deleteNote } from '../redux/noteSlice';
export const NoteCard = ({note}) => {
    const dispatch = useDispatch();

    const handleDelete  = async(e,id)=>{
        e.preventDefault();
        e.stopPropagation(); 

        if (!window.confirm("Are you sure you want to delete this note ")) return;

        try {
            await dispatch(deleteNote(id)).unwrap();
            toast.success("Note Clear Sucessfully")
            
        } catch (error) {
            console.log("Error in handleDelete",error);
            toast.error("Failed to delete note")
        }
    }

  return (
    <Link to={`/note/${note._id}`} className='card bg-base-100 hover:shadow-lg transition-all 
    duration-200 border-t-4 border-solid border-l-indigo-500'>
        <div className='card-body'>
            <h3 className='card-title text-base-content'>{note.title}</h3>
            <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
            <div className='card-actions justify-between items-center mt-4'>
                <span className='text-sm text-base-content/60'>{formatDate(new Date(note.createdAt)) }</span>
                <div className='flex items-center gap-1'>
                <PenSquareIcon className='size-4'/>
                <button className='btn btn-ghost btn-xs text-error'>
                    <TrashIcon className='size-4' onClick={(e)=>handleDelete(e,note._id)}/>
                </button>
            </div>
            </div>
            
        </div>
    </Link>
  )
}
