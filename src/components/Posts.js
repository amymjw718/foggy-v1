import React, { useEffect, useState } from 'react'
import Post from './Post'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { data } from 'autoprefixer';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy(("timestamp"),"desc")), (snapshot)=>{
        setPosts(snapshot.docs)
      }
    )
    return unsubscribe;
  },[db])
  // const posts = [
  //   {
  //     id:1,
  //     username:"userA",
  //     userImg:"https://i.pravatar.cc/150?img=15",
  //     img:"https://images.unsplash.com/photo-1686488427892-a1df07ce041b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  //     caption: "Hi there, good pic"
  //   },
  //   {
  //     id:2,
  //     username:"userB",
  //     userImg:"https://i.pravatar.cc/150?img=15",
  //     img:"https://images.unsplash.com/photo-1685972296712-602ab8774bad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
  //     caption: "Cute"
  //   }
  // ]
  return (
    <div>
      {
        posts.map(p => (
          <Post 
            key={p.id}
            id={p.id}
            username={p.data().username}
            userImg={p.data().profileImg}
            uid={p.data().uid}
            img={p.data().image}
            caption={p.data().caption}
          />
        ))
      }
    </div>
  )
}
