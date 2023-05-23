import React from 'react';
import Image from 'next/image';
//import '../styles/globals.css'

export default function Header() {
  return (
        <div className='flex items-center justify-between max-w-6xl flex-row'>
            {/* left */}
            <div className='cursor-pointer h-24 w-24 relative'>
                <Image src="/iconFoggy.png" layout='fill' className='object-contain'/>
            </div>
            
            <h1>Right</h1>

            {/* middle */}

            {/* right */}
        </div>
  )
}
