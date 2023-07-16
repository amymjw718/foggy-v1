//import React from 'react'
import {getProviders, signIn} from "next-auth/react";
import Header from "@/components/header";

export default function signin({providers}) {
  return (
    <>
        {/* <h1>sigin</h1> */}
        <Header />
        <div className="flex justify-center space-x-7 mt-10">
            {/* <img className="hidden object-cover rotate-6 md:inline-flex md:w-48" src="https://cdn.pixabay.com/photo/2021/05/28/00/29/bunny-6289491_1280.png" alt="foggyImg" /> */}
            <div className="">
                {
                    Object.values(providers).map((provider)=>{
                        return (
                            <div key={provider.name} className="flex flex-col items-center">
                                <img className="w-32 object-cover" src="https://t3.ftcdn.net/jpg/05/69/99/88/360_F_569998896_ub8700Rl1XcS3uJKxKtxCt2MibDfDMu0.jpg"/>
                                <h3 className="text-lg my-8 text-center font-bold">Welcome to Foggy</h3>
                                <button onClick={()=>signIn(provider.id,{callbackUrl:"/"})} className="text-lg bg-blue-400 rounded-lg p-3 text-white hover:bg-blue-500 font-bold">Sign In with {provider.name}</button>
                                <p className="text-sm italic my-8 text-center">This app is create for learning.</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </>
  )
}

export async function getServerSideProps(context){
    const providers = await getProviders();
    return {
        props: {providers}
    }
}
