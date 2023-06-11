import React from 'react'
import Post from './Post'

export default function Posts() {
  const posts = [
    {
      id:1,
      username:"userA",
      userImg:"https://i.pravatar.cc/150?img=15",
      img:"https://images.unsplash.com/photo-1686488427892-a1df07ce041b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      caption: "Hi there, good pic"
    },
    {
      id:2,
      username:"userB",
      userImg:"https://i.pravatar.cc/150?img=15",
      img:"https://images.unsplash.com/photo-1685972296712-602ab8774bad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
      caption: "Cute"
    }
  ]
  return (
    <div>
      {
        posts.map(p => (
          <Post 
            key={p.id}
            id={p.id}
            username={p.username}
            userImg={p.userImg}
            img={p.img}
            caption={p.caption}
          />
        ))
      }
    </div>
  )
}
