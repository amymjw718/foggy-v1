import React from 'react';

export default function UserStory({username, img}) {
  return (
    <div>
        <img src={img} alt={username}/>
        <p>{username}</p>
    </div>
  )
}
