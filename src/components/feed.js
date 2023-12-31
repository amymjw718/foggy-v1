import React from 'react';
import Story from '../components/Story';
import Posts from './Posts';
import MiniProfile from './MiniProfile';
import Suggestions from './Suggestions';
import { useSession } from 'next-auth/react';
import Todos from './Todos';

export default function Feed () {
  const {data: session} = useSession();
  return (
    <main className={`grid ${session ? "grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto" : "grid-cols-1 md:grid-cols-2 md:max-w-3xl mx-auto"}`}>
        <section className='md:col-span-2'>
            {/* Story */}
            {/* <Story /> */}
            {/* Post */}
            <Posts />
        </section>
        <section className='hidden md:inline-grid md:col-span-1'>
          <div className='fixed w-[380px]'>
            {/* mini profile */}
            <MiniProfile />
            {/* Suggestions list */}
            <Suggestions />
            {/* todo lisr */}
            <Todos pageFlag="home"/>
          </div>
        </section>
        
    </main>
  )
}
