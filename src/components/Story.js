import React, { useEffect, useState } from 'react';
import minifaker from  'minifaker';
import "minifaker/locales/en";
import UserStory from './UserStory';
import { useSession } from 'next-auth/react';

export default function Story() {
    const [users, setUsers] = useState([]);
    const {data:session} = useSession();
    useEffect(() => {
        const users = minifaker.array(20, (i) => (
            {
                userName: minifaker.username({locale:"en"}).toLowerCase(),
                img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random()*70)}`,
                id: i

            }
        ));
        setUsers(users);
        console.log(users);
    },[])

  return (
    <div className='flex space-x-2 p-6 bg-white mt-2 border border-gray-200 overflow-x-scroll items-center rounded-sm scrollbar-none'>
        {session && (
            <UserStory img={session.user.image} username={session.user.username} isUser="true" />
        )}
        {users.map(user => (
            <UserStory key={user.id} username={user.userName} img={user.img}/>
        ))}
    </div>
  )
}
