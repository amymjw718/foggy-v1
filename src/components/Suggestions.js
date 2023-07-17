//import React from 'react'
import minifaker from  'minifaker';
import React, { useEffect, useState } from 'react';

export default function Suggestions() {

    const [Suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const Suggestions = minifaker.array(3, (i) => (
            {
                userName: minifaker.username({locale:"en"}).toLowerCase(),
                jobTitle: minifaker.jobTitle(),
                img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random()*70)}`,
                id: i

            }
        ));
        setSuggestions(Suggestions);
        //console.log(Suggestions);
    },[])

  return (
    <div className="mt-4 ml-5">
        <div className="flex justify-between mb-5 text-sm">
            <h3 className="font-bold text-gray-400">Suggestions for user</h3>
            <button className="text-gray-600 font-semibold">See all</button>
        </div>
        {Suggestions.map(s => (
            <div className='flex items-center justify-between mt-3'>
                <img className='h-10 rounded-full border p-[2px]' src={s.img}></img>
                <div className='flex-1 ml-4'>
                    <h2 className='font-semibold text-sm'>{s.userName}</h2>
                    <h3 className='text-gray-400 text-sm truncate w-[230px]'>{s.jobTitle}</h3>
                </div>
                <button className='font-semibold text-blue-400 text-sm'>follow</button>
            </div>
        ))}
    </div>
  )
}
