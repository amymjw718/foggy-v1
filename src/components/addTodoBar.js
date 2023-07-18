// import React from 'react'
import Modal from "react-modal";
import { Snapshot, useRecoilState } from "recoil"
import { todoState } from "../../atom/modalAtom"

export default function AddTodoBar() {
    const [todoOpen, setTodoOpen] = useRecoilState(todoState);
  return (
    <div>
        {todoOpen && (
            <Modal isOpen={todoOpen} onRequestClose={()=>setTodoOpen(!todoOpen)}  className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md">
                <h1>hi</h1>
            </Modal>
        )}
    </div>
  )
}
// 