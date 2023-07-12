import React, { useEffect, useState } from 'react';
import minifaker from  'minifaker';
import "minifaker/locales/en";
import UserStory from './UserStory';

export default function Story() {
    const [users, setUsers] = useState([]);
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
        {users.map(user => (
            <UserStory key={user.id} username={user.userName} img={user.img}/>
        ))}
    </div>
  )
}
