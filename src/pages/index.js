import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
//import styles from '@/styles/Home.module.css'
import Header from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      {/* <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1> */}
      <Header />
    </div>
  )
}
