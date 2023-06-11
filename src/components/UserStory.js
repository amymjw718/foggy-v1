import React from 'react';

export default function UserStory({username, img}) {
  return (
    <div>
        <img src={img} alt={username} className='rounded-full p-[1.5px] border-red-500 border-2 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out'/>
        <p className='text-xs w-14 truncate'>{username}</p>
    </div>
  )
}
