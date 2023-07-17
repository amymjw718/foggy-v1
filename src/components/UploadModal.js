// import React from 'react'
import { useRecoilState } from "recoil"
import { modalState } from "../../atom/modalAtom"

export default function UploadModal() {
    const [open, setOpen] = useRecoilState(modalState);
  return (
    <div>
        <h1>Modal</h1>
        {open && <h1>The modal is open</h1>}
    </div>
  )
}
