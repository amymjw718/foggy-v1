import React from 'react';
import Image from 'next/image';
//import '../styles/globals.css'

export default function Header() {
  return (
        <div className='flex justify-between flex-row'>
            {/* left */}
            <div className='w-3/4 h-20'>
                <Image src="/favicon.ico" width={24} height={24}/>
            </div>
            {/* <div class="flex "> */}
                <div className="basis-1/4">01</div>
                <div className="basis-1/4">02</div>
                <div className="basis-1/2">03</div>
            {/* </sdiv> */}

            {/* middle */}

            {/* right */}
        </div>
  )
}
