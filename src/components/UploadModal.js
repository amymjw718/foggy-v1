// import React from 'react'
import { useRecoilState } from "recoil"
import { modalState } from "../../atom/modalAtom"
import Modal from "react-modal";
import { CameraIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";

export default function UploadModal() {
    const [open, setOpen] = useRecoilState(modalState);
    const [selectedFile, setSelectedFile] = useState(null);
    const filePickerRef = useRef(null);

    function addImageOnPost(event){
        const reader = new FileReader();
        if(event.target.files[0]){
            reader.readAsDataURL(event.target.files[0])
        }
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result)
        }

    }

  return (
    <div>
        {/* <h1>Modal</h1> */}
        {open && (
            <Modal
                className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
                isOpen={open}
                onRequestClose={()=>setOpen(!open)}
            >
                <div className="flex flex-col justify-center items-center h-[100%]">
                    {/* <h1>Modal</h1> */}
                    {selectedFile ? (
                        <img onClick={()=>setSelectedFile(null)} src={selectedFile} className="w-full max-h-[250px] object-cover cursor-pointer" />
                    ) : (<CameraIcon onClick={()=>filePickerRef.current.click()} className="cursor-pointer h-14 bg-blue-300 p-2 rounded-full border-2 text-blue-500" />)}
                    
                    <input type="file" hidden ref={filePickerRef} onChange={addImageOnPost}/>
                    <input type="text" maxLength="100" placeholder="Please enter the caption" className="m-4 border-none text-center w-full focus:ring-0" />
                    <button disabled className="w-full bg-slate-400 text-white p-2 shadow-md font-bold hover:bg-slate-500 disabled:bg-slate-200 disabled:cursor-not-allowed">Upload the post</button>
                </div>
            </Modal>
        )}
    </div>
  )
}
