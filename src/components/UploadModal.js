// import React from 'react'
import { Snapshot, useRecoilState } from "recoil"
import { modalState } from "../../atom/modalAtom"
import Modal from "react-modal";
import { CameraIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export default function UploadModal() {
    const [open, setOpen] = useRecoilState(modalState);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const {data: session} = useSession();

    const filePickerRef = useRef(null);
    const captionRef = useRef(null);

    function addImageOnPost(event){
        const reader = new FileReader();
        if(event.target.files[0]){
            reader.readAsDataURL(event.target.files[0])
        }
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result)
        }
    }

    async function uploadPost(){
        if(loading) return;
        setLoading(true);
        // setOpen(!open);
        const docRef = await addDoc(collection(db, "posts"),{
            caption: captionRef.current.value,
            username: session.user.username,
            profileImg: session.user.image,
            timestamp: serverTimestamp(),
        });
         const imageRef = ref(storage, `posts/${docRef.id}/image`);
         await uploadString(imageRef, selectedFile, "data_url").then(
            async(snapshot) => {
                const downloadURL = await getDownloadURL(imageRef)
                await updateDoc(doc(db, "posts", docRef.id),{
                    image: downloadURL,
                })
            }
         )
         setLoading(false);
         setOpen(!open);
         setSelectedFile(null);
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
                    <input type="text" maxLength="100" placeholder="Please enter the caption" ref={captionRef} className="m-4 border-none text-center w-full focus:ring-0" />
                    <button disabled={!selectedFile || loading}
                            onClick={uploadPost}
                            className="w-full bg-green-400 text-white p-2 shadow-md font-bold hover:bg-green-500 disabled:bg-slate-200 disabled:cursor-not-allowed"
                    >Upload the post</button>
                </div>
            </Modal>
        )}
    </div>
  )
}
