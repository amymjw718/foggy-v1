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
    <div>
        {users.map(user => (
            <UserStory key={user.id} username={user.userName} img={user.img}/>
        ))}
    </div>
  )
}
