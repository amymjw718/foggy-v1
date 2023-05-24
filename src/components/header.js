import React from 'react';
import Image from 'next/image';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

//import '../styles/globals.css'

export default function Header() {
  return (
        <div className='flex items-center justify-between max-w-6xl flex-row'>
            {/* left */}
            <div className='cursor-pointer h-24 w-24 relative'>
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

            <h1>Right</h1>

            
        </div>
  )
}
