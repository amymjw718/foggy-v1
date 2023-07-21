import React, { useEffect, useState,  } from 'react';
import { EllipsisHorizontalIcon, ChatBubbleBottomCenterIcon, HeartIcon, BookmarkIcon, FaceSmileIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Moment from 'react-moment';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid';


export default function Post({id,username,userImg,img,caption}) {
  const {data:session} = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [hasLiked, setHasLived] = useState(false);
  const [likes, setLikes] = useState([]);

  useEffect(()=>{
    const unsubscribe = onSnapshot(
      query(collection(db, "posts", id, "comments"), orderBy("timestamp", "desc")
    ),(snapshot) => {
      setComments(snapshot.docs)
    })

  },[db, id]);

  useEffect(()=>{
    const unsubscribe = onSnapshot(
      collection(db, 'posts', id, "likes"),(snapshot)=>{
        setLikes(snapshot.docs);
      }
    )
  },[db])

  useEffect(()=>{
    setHasLived(
      likes.findIndex(like=>like.id === session?.user.uid) !== -1
    )
  },[likes]);

  async function sendComment(event){
    event.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp()
    })

  }

  async function likePost(){
    if(hasLiked){
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid))
    }else{
      await setDoc(doc(db, "posts", id, "likes", session.user.uid),{
        username: session.user.username,
      })
    }
    
  }

  return (
    <div className='bg-white my-7 border rounded-md'>
        {/* post header */}

        <div className='flex items-center p-5'>
            <img className='h-12 rounded-full object-cover border p-1 mr-3' src={userImg} alt={username}/>
            <p className='font-bold flex-1'>{username}</p>
            <EllipsisHorizontalIcon className='h-5'/>
        </div>
        {/* post img */}

        <img src={img} className='object-cover w-full'/>

        {/* button */}
        {session && (<div className='flex justify-between px-4 pt-4 pb-1'>
          <div className='flex space-x-4'>
            {hasLiked ? <HeartIconFilled onClick={likePost} className='text-red-400 btn'/> : <HeartIcon onClick={likePost} className='btn'/>}
            
            
            <ChatBubbleBottomCenterIcon className='btn' />
          </div>
          <BookmarkIcon className='btn' />
        </div>)}
        

        {/* comments */}

        <p className='p-5 truncate'>
          {likes.length > 0 && (
            <p className='mb-5 font-bold text-gray-400'>{likes.length} likes</p>
          )}
          <span className='font-bold mr-2'>{username}</span>
          {caption}
        </p>
        {comments.length > 0 && (
          <div className='mx-10 max-h-24 overflow-y-scroll'>
            {comments.map((c)=>(
              <div className='flex items-center space-x-2 mb-2'>
                <img className='h-7 rounded-full object-cover' src={c.data().userImage} alt='userImage' />
                <p className='font-semibold'>{c.data().username}</p>
                <p className='flex-1 truncate'>{c.data().comment}</p>
                <Moment fromNow>{c.data().timestamp?.toDate()}</Moment>
              </div>
            ))}
          </div>
        )}

        {/* post comment and input box */}
        {session && (<form className='flex items-center p-4'>
          <FaceSmileIcon className='h-7'/>
          <input value={comment} onChange={(e)=>setComment(e.target.value)} className='border-none flex-1 focus:ring-0' type='text' placeholder='Enter your comment here...' />
          <button type='submit' onClick={sendComment} disabled={!comment.trim()} className='text-blue-400 font-bold disabled:text-gray-400'>Post</button>
        </form>
      )}
        

    </div>
  )
}
