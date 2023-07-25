import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import { db } from '../../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';


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
            <div className='flex space-x-3 mt-3 border border-gray-300 rounded-md shadow-md'>
                {posts.map(i => i.data().uid === session?.user.uid && (
                    <div className='h-50 w-50 border border-gray-300 rounded-md shadow-md'>
                        <img className='h-40' src={i.data().image}/>
                    </div>
                ))}
            </div>
        </section>
        <section className='md:inline-grid md:col-span-1'>
            <p>Hello</p>
        </section>
    </main>
    </>
  )
}
