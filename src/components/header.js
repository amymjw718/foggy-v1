import React from 'react';
import Image from 'next/image';
import { MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { HomeIcon } from '@heroicons/react/24/solid';
import { useSession, signIn, signOut } from 'next-auth/react';

//import '../styles/globals.css'

export default function Header() {
    const {data: session} = useSession();
    console.log(session);

  return (
    <div className='shadow-sm border-b sticky top-0 bg-white z-30'>
        <div className='flex items-center justify-between max-w-6xl flex-row mx-4 xl:mx-auto'>
            {/* left */}
            <div className='cursor-pointer h-24 w-24 relative mx-10'>
                <Image src="/iconFoggy.png" layout='fill' className='object-contain'/>
            </div>

            {/* middle */}
            <div className='relative'>
                <div className='absolute top-1.5 left-2'>
                    <MagnifyingGlassIcon className="h-6 w-6 m1-0" />
                </div>
                <input type='text' placeholder='Search' className='bg-gray-50 px-10 border-gray-600 text-sm focus:border-black rounded-md' />
            </div>

            {/* right */}
            <div className='flex space-x-4 items-center'>
                <HomeIcon className="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"/>
                {session ?(<>
                    <PlusCircleIcon className="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"/>
                    <img onClick={signOut} src={session.user.image} className='h-10 w-10 rounded-full cursor-pointer'/>
                </>):(
                    <button onClick={signIn}>Sign In</button>
                ) }
                
            </div>


        </div>
    </div>
  )
}
//https://i.pravatar.cc/150?img=15
