import React from 'react'

export default function MiniProfile() {
  return (
    <div className='flex items-center justify-between mt-8 ml-5'>
        <img className='h-16 rounded-full border p-[2px]' src='https://i.pravatar.cc/150?img=15' alt='user-image'/>
        <div className='flex-1 ml-4'>
            <h2 className='font-bold'>Name</h2>
            <h3 className='text-sm text-gray-500'>Welcome to the app</h3>
        </div>
        <button className='font-semibold text-blue-400 text-sm'>Sign out</button>
    </div>
  )
}
