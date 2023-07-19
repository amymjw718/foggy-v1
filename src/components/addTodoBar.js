// import React from 'react'
import Modal from "react-modal";
import { Snapshot, useRecoilState } from "recoil"
import { todoState } from "../../atom/modalAtom"
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AddTodoBar() {
    const [todoOpen, setTodoOpen] = useRecoilState(todoState);
    // const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false);
    const {data: session} = useSession()

  return (
    <div>
        {todoOpen && (
            <Modal isOpen={todoOpen} onRequestClose={()=>setTodoOpen(!todoOpen)}  className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md">
                {/* <h1>hi</h1> */}
                <input type="text" maxLength="100" placeholder="Please enter the new Todo" className="m-4 border-none text-center w-full focus:ring-0" />
                    <button 
                            className="w-full bg-green-400 text-white p-2 shadow-md font-bold hover:bg-green-500 disabled:bg-slate-200 disabled:cursor-not-allowed"
                    >Add Todo</button>
            </Modal>
        )}
    </div>
  )
}
