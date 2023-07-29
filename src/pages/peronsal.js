import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import { db } from '../../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Todos from '@/components/Todos';
import AddTodoBar from '@/components/addTodoBar';
import Calender from '@/components/calender';


export default function Peronsal() {
    const [posts, setPosts] = useState([]);
    const {data:session} = useSession();
  useEffect(()=>{
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy(("timestamp"),"desc")), (snapshot)=>{
        setPosts(snapshot.docs)
      }
    )
    return unsubscribe;
  },[db])
  return (
    <>
    <Header />
    <main className='grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto'>
        
        <section className='md:col-span-2'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3'>
                {posts.map(i => i.data().uid === session?.user.uid && (
                    <div key={i.data().timestamp} className='border border-gray-300 rounded-md shadow-md'>
                        <img className='w-full h-70 object-cover' src={i.data().image}/>
                    </div>
                ))}
            </div>
        </section>
        <section className='md:inline-grid md:col-span-1 mt-3 ml-3 flex-col justify-center items-center p-5'>
            {/* <p>Hello</p> */}
            <Calender />
            <Todos />
            <AddTodoBar />
        </section>
    </main>
    </>
  )
}
