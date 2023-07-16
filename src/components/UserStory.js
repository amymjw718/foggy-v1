import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function UserStory({username, img, isUser}) {
  return (
    <div className='relative'>
        <img src={img} alt={username} className='rounded-full p-[1.5px] border-red-500 border-2 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out'/>
        {isUser && <PlusIcon className='h-6 absolute top-4 left-4 text-white'/>}
        <p className='text-xs w-14 truncate'>{username}</p>
    </div>
  )
}
