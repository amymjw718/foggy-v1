import React from 'react';
import Story from '../components/Story';
import Posts from './Posts';

export default function Feed () {
  return (
    <main>
        <section>
            {/* Story */}
            <Story />
            {/* Post */}
            <Posts />
        </section>
        <section>
            {/* mini profile */}
            {/* list */}
        </section>
        
    </main>
  )
}
