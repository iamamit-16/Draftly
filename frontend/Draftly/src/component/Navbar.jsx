import React from 'react'
import {PlusIcon} from "lucide-react"
import {Link} from "react-router"
export const Navbar = () => {
  return (
    <header className='bg-base-200 border-b border-base-content/5'>
      <div className='mx-auto max-w-6xl p-4'>
       <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold text-primary font-mono'>Draftly</h1>
        <div className='flex items-center gap-4'>
           <Link to={"/create"} className='btn btn-primary'>
           <PlusIcon className='size-5'/>
           <span>New Note</span>
          </Link>
        </div>
       
       </div>
      </div>

    </header>
  )
}
