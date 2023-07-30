// import React from 'react'
import Modal from "react-modal";
import { Snapshot, useRecoilState } from "recoil"
import { todoState } from "../../atom/modalAtom"
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
// import Calender from '@/components/calender';
// import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'


export default function AddTodoBar() {
    const [calenderValue, setCalenderValue] = useState(new Date());
    const today = new Date();
    console.log(today)
    const [todoOpen, setTodoOpen] = useRecoilState(todoState);
    // const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false);
    const {data: session} = useSession();


    const [todo, setTodo] = useState("");
    // const todoRef = useRef(null)

    async function sendTodo(event){
        if(loading) return;
        setLoading(true);
        event.preventDefault();
        const todoName = todo;
        setTodo("");
        // await addDoc(collection(db, "comments", session.user.uid), {
        //   todoName: todoName,
        //   username: session.user.username,
        //   timestamp: serverTimestamp()
        // })

        if (session) {
            try {
              await addDoc(collection(db, "todos"), {
                // Replace 'userTodos' with the name of the collection where you want to add the document.
                todoName: todoName,
                uid: session.user.uid,
                username: session.user.username,
                timestamp: serverTimestamp(),
                year: calenderValue.getFullYear(),
                month: calenderValue.getMonth()+1,
                date: calenderValue.getDate(),
              });
              console.log("Todo added successfully!");
            } catch (error) {
              console.error("Error adding todo:", error.message);
            }
          }
        setLoading(false);
        setTodoOpen(!todoOpen);
    
      }



  return (
    <div>
        {todoOpen && (
            <Modal isOpen={todoOpen} onRequestClose={()=>setTodoOpen(!todoOpen)}  className="max-w-lg w-[90%] p-6 absolute top-32 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md items-center">
                {/* <h1>hi</h1> */}
                <div className='mt-1 flex items-center justify-center'>
                  <Calendar className="items-center" value={calenderValue} onChange={setCalenderValue} />
                </div>
                <input value={todo} onChange={(e)=>setTodo(e.target.value)} type="text" maxLength="100" placeholder="Please enter the new Todo" className="m-4 border-none text-center w-full focus:ring-0" />
                    <button onClick={sendTodo}
                            className="w-full bg-green-400 text-white p-2 shadow-md font-bold hover:bg-green-500 disabled:bg-slate-200 disabled:cursor-not-allowed"
                    >Add Todo</button>
            </Modal>
        )}
    </div>
  )
}
