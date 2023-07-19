import React, { useState } from 'react';
import { EllipsisHorizontalIcon, ChatBubbleBottomCenterIcon, HeartIcon, BookmarkIcon, FaceSmileIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Post({id,username,userImg,img,caption}) {
  const {data:session} = useSession();
  const [comment, setComment] = useState("");

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
        {session && (<div className='flex justify-between px-4 pt-4 pb-4'>
          <div className='flex space-x-4'>
            <HeartIcon className='btn'/>
            <ChatBubbleBottomCenterIcon className='btn' />
          </div>
          <BookmarkIcon className='btn' />
        </div>)}
        

        {/* comments */}

        <p className='p-5 truncate'>
          <span className='font-bold mr-2'>{username}</span>
          {caption}
        </p>

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
