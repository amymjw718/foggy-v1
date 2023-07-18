//import React from 'react'
// import minifaker from  'minifaker';
import React, { useEffect, useState } from 'react';

export default function Todos() {

    const [Todos, setTodos] = useState([]);

    useEffect(() => {
        const Todos =
        //  array(3, (i) => (
            // {
                [{
                    name: "reading",
                    isCompleted: false,
                    date: "2023.7.18"
                },{
                    name: "writing",
                    isCompleted: true,
                    date: "2023.7.18"
                }]
                

            // };
            setTodos(Todos);
        //console.log(Suggestions);
    },[])

  return (
    <div className="mt-10 ml-5">
        <div className="flex justify-between mb-5 text-sm">
            <h3 className="font-bold text-gray-500">Todo list for today</h3>
        </div>
        {Todos.map(s => (
            <div className='flex items-center justify-between mt-3'>
                <input type='checkbox'/> 
                {/* checked={s.isCompleted} */}
                <div className='flex-1 ml-4'>
                    <h2 className='font-semibold text-sm'>{s.name}</h2>
                    {/* <h3 className='text-gray-400 text-sm truncate w-[230px]'>{s.isCompleted}</h3> */}
                </div>
                <button className='font-semibold text-blue-400 text-sm'>Delete</button>
            </div>
        ))}
    </div>
  )
}
