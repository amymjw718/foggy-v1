import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
//import styles from '@/styles/Home.module.css'
import Header from '@/components/header'
import Feed from '@/components/feed'
import UploadModal from '@/components/UploadModal'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <Header />
      <Feed />
      <UploadModal />
    </div>
  )
}
