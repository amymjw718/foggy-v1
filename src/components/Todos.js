//import React from 'react'
// import minifaker from  'minifaker';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { todoState } from '../../atom/modalAtom';
import { collection, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useSession } from 'next-auth/react';

export default function Todos({pageFlag}) {

    const [Todos, setTodos] = useState([]);
    const [openTodo, setOpenTodo] = useRecoilState(todoState);
    const {data:session} = useSession();
    const today =  new Date();

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "todos"), (snapshot) => {
                setTodos(snapshot.docs);
            }
        )

    },[db])

    async function deleteTodo(id){
        // await deleteDoc(doc(db,"todos",id))
        try {
            await deleteDoc(doc(db, "todos", id));
            console.log("Todo deleted successfully!");
          } catch (error) {
            console.error("Error deleting todo:", error.message);
          }
    }

  return (
    <div className="mt-10 ml-5">
        <div className="flex justify-between mb-5 text-sm">
            <h3 className="font-bold text-gray-500">Todo list for today</h3>
        </div>
        {Todos.map(s => 
        s.data().uid === session?.user.uid &&
        pageFlag === "home" ? 
        s.data().year === today.getFullYear() && s.data().month === today.getMonth()+1 && s.data().date === today.getDate() &&
        (   
            <div key={s.data().timestamp} className='flex items-center justify-between mt-3'>
                <input type='checkbox'/> 
                {/* checked={s.isCompleted} */}
                <div className='flex-1 ml-4'>
                    <h2 className='font-semibold text-sm'>{s.data().todoName}</h2>
                    {/* <h3 className='text-gray-400 text-sm truncate w-[230px]'>{s.isCompleted}</h3> */}
                </div>
                <button onClick={() => deleteTodo(s.id)} className='font-semibold text-red-400 text-sm'>Delete</button>
            </div>
        ) : (   
            <div key={s.data().timestamp} className='flex items-center justify-between mt-3'>
                <input type='checkbox'/> 
                {/* checked={s.isCompleted} */}
                <div className='flex-1 ml-4'>
                    <h2 className='font-semibold text-sm'>{s.data().todoName}</h2>
                    {/* <h3 className='text-gray-400 text-sm truncate w-[230px]'>{s.isCompleted}</h3> */}
                </div>
                <button onClick={() => deleteTodo(s.id)} className='font-semibold text-red-400 text-sm'>Delete</button>
            </div>
        ))}
        <div className='flex text-center justify-center'>
            <button onClick={()=>setOpenTodo(!openTodo)} className='h-10 w-10 bg-blue-300 text-white font-bold rounded-full p-2 mt-5 shadow-md hover:bg-blue-400'>+</button>
        </div>
    </div>
  )
}
